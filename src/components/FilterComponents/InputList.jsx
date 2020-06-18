import React, { useState, useEffect } from 'react';
import Autocomplete from 'react-autocomplete';
import style from './InputList.module.scss';
import axios from 'axios';

const CancelToken = axios.CancelToken;

let cancel;

const InputList = ({ setRequestData, toggleBtnStatus, shipment }) => {
  const [value_a, setValue_a] = useState('');
  const [value_b, setValue_b] = useState('');

  const [positionA, setPositionA] = useState({});
  const [positionB, setPositionB] = useState({});

  const [city_list, setCity_list] = useState([]);

  const onChange = (e, route = 'a') => {
    const input = e.target.value;
    let city_list = [];

    if (input.length >= 2) {
      let request_obj = {
        input: input,
      };

      const data = new FormData();
      Object.keys(request_obj).map(function (objectKey, index) {
        let value = request_obj[objectKey];
        data.append(objectKey, value);
      });

      if (cancel !== undefined) cancel();
      axios
        .post('https://www.searates.com/search/google-autocomplete', data, {
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        })
        .then((response) => {
          response.data.map((item) => {
            city_list = [...city_list, item];
          });

          if (route === 'a') {
            setValue_a(input);
            setCity_list(city_list);
          } else {
            setValue_b(input);
            setCity_list(city_list);
          }
        })
        .catch((error) => {});
    } else {
      setCity_list([]);
    }

    route === 'a' ? setValue_a(input) : setValue_b(input);
  };

  const onSelect = (id, route = 'a') => {
    const place_id = id;
    const type = 'place_id';
    const city = getDataFromList(id, 'city');
    const country = getDataFromList(id, 'code');

    route === 'a'
      ? setValue_a(`${city}, ${country}`)
      : setValue_b(`${city}, ${country}`);

    let request_obj = {
      input: place_id,
      type: type,
    };

    const data = new FormData();
    Object.keys(request_obj).map(function (objectKey, index) {
      let value = request_obj[objectKey];
      data.append(objectKey, value);
    });

    axios
      .post('https://www.searates.com/search/google-geocode', data)
      .then((response) => {
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        if (route === 'a') {
          setRequestData((state) => ({
            params: {
              ...state.params,
              lat_from: lat,
              lng_from: lng,
            },
          }));
          setPositionA({
            lat_from: lat,
            lng_from: lng,
          });
        } else {
          setRequestData((state) => ({
            params: {
              ...state.params,
              lat_to: lat,
              lng_to: lng,
            },
          }));
          setPositionB({
            lat_to: lat,
            lng_to: lng,
          });
        }
      })
      .catch(function (error) {});

    setCity_list([]);
  };

  const getDataFromList = (list_item, data) => {
    let item_data = '';

    city_list.map((item, i) => {
      if (typeof list_item === 'string') {
        if (list_item === city_list[i].place_id) {
          item_data = city_list[i][data];
        }
      } else {
        if (list_item.place_id === city_list[i].place_id) {
          item_data = city_list[i][data];
        }
      }
    });

    return item_data;
  };

  function exchageDirection() {
    setValue_a(value_b);
    setValue_b(value_a);

    setPositionB({
      lat_to: positionA.lat_from,
      lng_to: positionA.lng_from,
    });

    setPositionA({
      lat_from: positionB.lat_to,
      lng_from: positionB.lng_to,
    });

    setRequestData((state) => ({
      params: {
        ...state.params,
        lat_to: positionA.lat_from,
        lng_to: positionA.lng_from,
        lat_from: positionB.lat_to,
        lng_from: positionB.lng_to,
      },
    }));
  }

  return (
    <div className={style['input__part']}>
      <div
        data-direction='A'
        className={`${style[`input__wrapper`]} ${style[`${shipment}`]}`}
      >
        <label className={style['title']}>Port of origin</label>
        <Autocomplete
          name='origin'
          type='text'
          required
          getItemValue={(item) => item.place_id}
          items={city_list}
          renderItem={(item, isHighlighted) => (
            <div
              key={item.place_id}
              className={style['autocomplete-item']}
              style={{ background: isHighlighted ? 'lightgray' : 'white' }}
            >
              <div>
                <span className={style['city']}>
                  {getDataFromList(item, 'city')}
                </span>
                ,<span>{` ${getDataFromList(item, 'country')} `}</span>
              </div>
              <i
                className={` flag-icon flag-icon-${getDataFromList(
                  item,
                  'code',
                ).toLowerCase()} `}
              ></i>
            </div>
          )}
          value={value_a}
          onChange={(e) => {
            onChange(e, 'a');
          }}
          onSelect={(e) => onSelect(e, 'a')}
          selectOnBlur={true}
          inputProps={{
            placeholder: 'Country, City, Port',
            className: `${style.input}  ${style.from}`,
            required: true,
          }}
        />
      </div>
      <div
        data-direction='B'
        className={`${style[`input__wrapper`]} ${style[`${shipment}`]} ${
          style['to__wrapper']
        }`}
      >
        <label className={style['title']}>Port of Destination</label>
        <Autocomplete
          name='origin'
          type='text'
          required
          getItemValue={(item) => item.place_id}
          items={city_list}
          renderItem={(item, isHighlighted) => (
            <div
              key={item.place_id}
              className={style['autocomplete-item']}
              style={{ background: isHighlighted ? 'lightgray' : 'white' }}
            >
              <div>
                <span className={style['city']}>
                  {getDataFromList(item, 'city')},
                </span>
                <span>{` ${getDataFromList(item, 'country')} `}</span>
              </div>
              <i
                className={` flag-icon flag-icon-${getDataFromList(
                  item,
                  'code',
                ).toLowerCase()} `}
              ></i>
            </div>
          )}
          value={value_b}
          onChange={(e) => {
            onChange(e, 'b');
          }}
          onSelect={(e) => onSelect(e, 'b')}
          // selectOnBlur={true}
          inputProps={{
            placeholder: 'Country, City, Port',
            className: `${style.input}  ${style.to}`,
            required: true,
          }}
        />
      </div>

      <div
        className={`${style.exchange__btn} ${style[`${shipment}`]} ${
          toggleBtnStatus ? style.loading : ''
        }`}
      >
        <span onClick={exchageDirection}></span>
      </div>
    </div>
  );
};

export default InputList;
