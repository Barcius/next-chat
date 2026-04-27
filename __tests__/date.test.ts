import { dateToFullString, dateToHHMM } from '@/src/shared/ui/date';

const data = {
  hhmm: {
    '1777204664849': '14:57',
    '1777208233891': '15:57',
    '1777210156956': '16:29',
    '1777224136252': '20:22',
    '1777224143643': '20:22',
    '1777283951901': '12:59',
    '1777283954011': '12:59',
  },
  full: {
    '1777204664849': 'Sunday, 26 April 2026 at 14:57:44',
    '1777208233891': 'Sunday, 26 April 2026 at 15:57:13',
    '1777210156956': 'Sunday, 26 April 2026 at 16:29:16',
    '1777224136252': 'Sunday, 26 April 2026 at 20:22:16',
    '1777224143643': 'Sunday, 26 April 2026 at 20:22:23',
    '1777283951901': 'Monday, 27 April 2026 at 12:59:11',
    '1777283954011': 'Monday, 27 April 2026 at 12:59:14',
  },
};
const hhmmData = Object.entries(data.hhmm).map(([inp, out]) => ({ inp, out }));
const fullData = Object.entries(data.full).map(([inp, out]) => ({ inp, out }));
describe('testing data formatting functions', () => {
  it.each(hhmmData)('formats date to HH:MM', ({ inp, out }) => {
    const date = new Date(+inp);
    expect(dateToHHMM(date)).toEqual(out);
  });
  it.each(fullData)('formats date to full string', ({ inp, out }) => {
    const date = new Date(+inp);
    expect(dateToFullString(date)).toEqual(out);
  });
});
