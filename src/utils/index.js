export const getStatus = (res) => {
  let shipmetType = ['sea', 'air', 'road'];

  for (let i = 0; i < shipmetType.length; i++) {
    if (Object.keys(res).includes(shipmetType[i])) {
      return shipmetType[i];
    }
  }
  return 'error';
};

export const transfSeconds = (sec) => {
  if (isNaN(sec) === true) {
    return 'Not correct data';
  }

  let d = Math.floor(+sec / (3600 * 24)),
    h = Math.floor((+sec % (3600 * 24)) / 3600);

  let dDisplay = d > 0 ? d + (d == 1 ? ' day ' : ' days ') : '',
    hDisplay = h > 0 ? h + (h == 1 ? ' hour ' : ' hours ') : '';

  if (d == 0 && h <= 2) {
    return 'an hour';
  } else {
    return dDisplay + hDisplay;
  }
};

export const calcDist = (km) => {
  const fromKmToMiles = 0.539957;
  if (isNaN(km) === true) {
    return 'Not correct data';
  }
  let miles = Math.round(km * fromKmToMiles * 100) / 100;

  let kmDisplay = km + ' km',
    mDisplay = miles + ' mi,';

  return `${mDisplay} (${kmDisplay})`;
};

export const calcSpeed = (km) => {
  let corKm = parseFloat(km);
  const fromKmToMiles = 0.6214;
  if (isNaN(corKm) === true) {
    return 'Not correct data';
  }
  let miles = Math.round(corKm * fromKmToMiles);
  return `${miles} mp/h (${km})`;
};

export const openInNewTab = (url) => {
  window.open(url, '_blank');
};
