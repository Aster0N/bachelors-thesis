import classes from "./DynamicTable.module.scss"

type TableProps<T> = {
  columns: { key: keyof T; label: string }[]
  data: T[]
}

const DynamicTable = <T extends object>({ columns, data }: TableProps<T>) => {
  return (
    <div className={classes.tableWrapper}>
      <table className={classes.table}>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={String(column.key)}>
                <p>{column.label}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(column => (
                <td key={String(column.key)} className="_small">
                  {String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DynamicTable
