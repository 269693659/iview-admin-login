import numeral from 'numeral'

export default (number) => {
  if (number === undefined) return '-'
  return numeral(number).format('0,0.00')
}
