/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { useTable, useSortBy, useFilters, usePagination, Column } from 'react-table'
import { IaccountData } from '../../redux/tableSlice/model';
import { useMemo } from 'react';

interface ITableUI {
    columns: Column[];
    data: IaccountData[];
}

function DefaultColumnFilter({
    column: { filterValue, setFilter },
}: {
    column: { filterValue: string, setFilter: (param?: string) => void }
}) {

    return (
        <input
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Search...`}
            className='py-2 px-4 rounded-full focus:outline-none ring-2 ring-offset-2 ring-light-blue-100 bg-white dark:bg-dark-blue pl-search pr-5'
        />
    );
}

const TableUi = ({ columns, data }: ITableUI) => {
    const defaultColumn = useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            defaultColumn: (defaultColumn as Partial<Column>),
        },
        useFilters,
        useSortBy,
        usePagination
    );

    return (
        <>
            <div className='overflow-x-auto'>
                <table {...getTableProps()} className='min-w-full !border-spacing-y-[5px] !border-separate'>
                    <thead className='text-xs font-medium text-left text-input'>
                        {headerGroups.map((headerGroup, i) => {
                            const { key, ...props } = headerGroup.getHeaderGroupProps();
                            return (
                                <tr
                                    key={key}
                                    {...props}
                                    className='text-center border-0 text-xs font-normal text-grey-900 sm:pl-6 md:text-sm'
                                >
                                    {headerGroup.headers.map((column: any, j, arr) => {
                                        const { key, ...props } = arr.length - 1 !== j ? column.getHeaderProps(column.getSortByToggleProps()) : column.getHeaderProps();

                                        return column.id !== 'selection' ? (
                                            <th
                                                key={key}
                                                {...props}
                                                className='py-3 pl-[5px] border-0 text-left text-sm font-normal intern first-of-type:pl-5'
                                            >
                                                <div className='flex w-full justify-between items-center'>
                                                    <div className='flex gap-2'>
                                                        <span className='whitespace-nowrap'>{column.render('Header')}</span>
                                                        {j !== arr.length - 1 &&
                                                            <div className='flex flex-col'>
                                                                <ArrowUpIcon className='w-2 h-2 inline-block' />
                                                                <ArrowDownIcon className='w-2 h-2 inline-block' />
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </th>
                                        ) : null;
                                    })}
                                </tr>
                            )
                        })}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            const { key, ...props } = row.getRowProps();
                            return (
                                <tr
                                    key={key}
                                    {...props}
                                    className='bg-light-grey-600 border-none'
                                >
                                    {row.cells.map((cell: any, j, arr) => {
                                        const { key, ...cellProps } = cell.getCellProps();

                                        return cell.column.id !== 'selection' ? (
                                            <td
                                                key={key}
                                                {...cellProps}
                                                className={`${j === 0 && 'pl-6'} border-none relative py-1 pr-3 text-sm font-medium text-gray-900`} >
                                                <div className={`flex items-center gap-[30px] text-base intern rowItem py-2 ${j === arr.length - 1 ? 'border-r-0' : 'border-r-[1px] pr-3'} border-light-grey-200  border-l-0 border-t-0 border-b-0 `}>
                                                    {cell.render('Cell')}
                                                </div>
                                            </td>
                                        ) : null;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                    {!rows.length &&
                        <div className='w-full h-full min-h-[150px] flex justify-center items-center'></div>
                    }
                </table>
            </div >
        </>
    );
};

export { TableUi };