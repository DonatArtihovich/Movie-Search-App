export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

export function getMoneyString(budget: number): string {
    const budgetStr = budget.toString().split('').reverse();
    const digits = [];

    for (let i = 0; i <= budgetStr.length; i += 3) {
        digits.push(budgetStr.slice(i - 3, i).reverse().join(''));

        if (budgetStr.length - i < 3) {
            digits.push(budgetStr.slice(i).reverse().join(''));
        }
    }

    return `$${digits.filter(i => i).reverse().join(',')}`;
}

export function getTimeString(time: number) {
    const hours = Math.floor(time / 60);
    const minutes = time - hours * 60;

    return `${hours? `${hours}h ` : ''}${minutes? `${minutes}m` : ''}`;
}