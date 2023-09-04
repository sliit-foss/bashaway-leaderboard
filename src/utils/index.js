export const isRegex = (s) => {
  try {
    const m = s.match(/^([/~@;%#'])(.*?)\1([gimsuy]*)$/);
    return m ? !!new RegExp(m[2], m[3]) : false;
  } catch (e) {
    return false;
  }
};
