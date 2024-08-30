// ============================== Function for custom date -- dd/mm/yy =======================
export class DateFormat {
    static formatDate(date) {
        const d = new Date(date);
        if (isNaN(d.getTime())) {
            // ===> date is not a valid date
            console.error(`Invalid date: ${date}`);
            return date;
        } else {
            const month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            return [day.padStart(2, '0'), month.padStart(2, '0'), year].join('-');
        }
    }
}
