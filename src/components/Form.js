import { useState } from 'react'

function Form() {

    const [rows, setRows] = useState([
        {
            account: "",
            debitAmount: "",
            creditAmount: ""
        }
    ]);

    const accounts = ["Account 1 ", "Account 2", "Account 3"];

    const addRows = ()=> {
        setRows((prevRows)=> {
            return ([...prevRows, {
                account: "",
                debitAmount: "",
                creditAmount: ""
            }])
        });
    };

    const deleteRow = (index)=> {
        setRows((prevRows)=> prevRows.filter((row, i)=> i !== index))
    };

    const handleChange = (e, index)=> {
        setRows(prevRows =>
            prevRows.map((row, i) => {
              if (i === index) {
                return { ...row, [e.target.name]: e.target.value };
              }
              return row;
            })
        );
    };

    const formatAmount = (amount)=> {
        return amount.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR'
        });
    };

    const totalDebitAmount = rows.reduce((total, row) => {
        return total + Number(row.debitAmount);
    }, 0);

    const totalCreditAmount = rows.reduce((total, row) => {
        return total + Number(row.creditAmount);
    }, 0);

  return (
    <div className="table">
        {rows.map((row, index)=> (
            <div key={index}>

                <select
                    name="account"
                    value={row.account}
                    onChange={(e)=> handleChange(e, index)}
                >
                    <option value="">Select</option>
                    {accounts.map((account)=> (
                        <option key={account} value={account}>
                            {account}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    name="debitAmount"
                    value={row.debitAmount}
                    onChange={(e)=> handleChange(e,index)}
                    onBlur={(e)=> {
                        e.target.value = formatAmount(e.target.value)
                    }}
                />

                <input
                    type="number"
                    name="creditAmount"
                    value={row.creditAmount}
                    onChange={(e)=> handleChange(e,index)}
                    onBlur={(e)=> {
                        e.target.value = formatAmount(e.target.value)
                    }}
                />
                <button onClick={()=> deleteRow(index)}>Remove</button>
            </div>
        ))}

        <div className="totalAmount">
            <p>Total Debit: {formatAmount(totalDebitAmount)}</p>
            <p>Total Credit: {formatAmount(totalCreditAmount)}</p>
        </div>

        <button onClick={addRows}>Add Rows</button>
    </div>
  );
};

export default Form;

