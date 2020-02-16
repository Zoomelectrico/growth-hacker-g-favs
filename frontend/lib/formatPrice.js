export default number =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
    .format(Number(number) / 100)
    .replace('$', '')
    .replace(/( )/g, '')
    .trim();
