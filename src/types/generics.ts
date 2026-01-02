import dayjs from 'dayjs';

export type SelectOption = {
    value: string;
    label: string;
}

const date = dayjs();
export const StartDate = date.subtract(1, 'month');
export const EndDate = date.add(1, 'year');