export const addClassName = (el, str) => {
  const classNames = el.className.split(' ');
  // Prevent from adding > once
  if (classNames.includes(str)) {
    return;
  }
  classNames.push(str);
  el.className = classNames.join(' ');
}

export const removeClassName = (el, str) => {
  const classNames = el.className.split(' ');
  const newClassNames = classNames.filter(cn => cn !== str);
  el.className = newClassNames.join(' ');
}
