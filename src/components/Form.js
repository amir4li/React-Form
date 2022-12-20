import { useState } from 'react'
import Input from './Input';

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
        const formattedAmount = amount.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR'
        });
        return formattedAmount;
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

                <Input
                    name={"debitAmount"}
                    value={row.debitAmount}
                    index={index}
                    changeHandler={handleChange}
                    formatAmount={formatAmount}
                />

                <Input
                    name={"creditAmount"}
                    value={row.creditAmount}
                    index={index}
                    changeHandler={handleChange}
                    formatAmount={formatAmount}
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

