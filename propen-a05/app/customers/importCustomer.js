"use client";
import React, {useState} from "react";
import TextWithIconButton from "@/app/components/ui/TextWithIconButton"
import { useRouter } from "next/navigation";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as XLSX from 'xlsx';
import MUIDataTable from "mui-datatables";
import { Fab } from "@material-ui/core";

const ExcelImport = () => {
    const [tableData, setTabledata] = useState([]);

    const convertToJson = async (headers, data) => {
        debugger
        const rows=[]
        data.forEach(async row => {
            let rowData = {}
            row.forEach(async (element, index) => {
                rowData[headers[index]] = element;
            })
            console.log("rowData--->", rowData)
            row.push(rowData)
        });
        setTabledata(rows)
        return rows;
    }

    const importExcel = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (event) => {
            const bstr = event.target.result 
            const workBook = XLSX.read(bstr, {type: "binary"}) 
            const workSheetName = workBook.SheetNames[0] 
            const workSheet = workBook.Sheets[workSheetName]
            const fileData = XLSX.utils.sheet_to_json(workSheet, {header: 1}) 
            const headers = fileData[0] 
            const heads = headers.map(head => ({title: head, field: head})) 
            fileData.splice(0, 1) 
            convertToJson(headers, fileData)
        }
        reader.readAsBinaryString(file)
    }

    const columns = [
        {
            name: "outlet",
            label: "Outlet",
            options: {
                filter: false,
                sort: true,
                display: false,
            }
        },
        {
            name: "number",
            label: "Number",
            options: {
                filter: false,
                sort: true,
                display: false,
            }
        },
        {
            name: "name",
            label: "Customer Name",
            options: {
                filter: false,
                sort: true,
                display: false,
            }
        },
        {
            name: "code",
            label: "Code",
            options: {
                filter: false,
                sort: true,
                display: false,
            }
        },
        {
            name: "referenceNumber",
            label: "Reference Number",
            options: {
                filter: false,
                sort: true,
                display: false,
            }
        },
        {
            name: "date",
            label: "Date",
            options: {
                filter: false,
                sort: true,
                display: false,
            }
        },
        {
            name: "createdTime",
            label: "Created Time",
            options: {
                filter: false,
                sort: true,
                display: false,
            }
        },
        {
            name: "due",
            label: "Due",
            options: {
                filter: false,
                sort: true,
                display: false,
            }
        },
        {
            name: "amount",
            label: "Amount",
            options: {
                filter: false,
                sort: true,
                display: false,
            }
        },
        {
            name: "payment",
            label: "Payment",
            options: {
                filter: false,
                sort: true,
                display: false,
            }
        },
        {
            name: "fulfillment",
            label: "Fulfillment",
            options: {
                filter: false,
                sort: true,
                display: false,
            }
        }
    ]

    const options = {
        sorting: true,
        print: false,
        download: false,
        filter: false,
        fixedHeader: true,
        caseSensitive: false,
        selectableRows: false,
        customSearch: false,
    }

    return (
        <div style={{width: '100%', marginBottom: '1%', marginTop: '2%'}}>
            <div className="datatables">
                
            </div>

            <Paper style={{width: '100%', marginBottom: '1%', marginTop: '3%', paddingLeft: '1%'}} elevation='5'>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={8}>
                            <div>
                            <label htmlFor="upload-photo">
                                <input
                                    required
                                    style={{ display: "none"}}
                                    id="upload-photo"
                                    name="upload_photo"
                                    type="file"
                                    onChange={importExcel}
                                />
                                <Fab  
                                    color="primary"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    variant="extended"
                                >
                                    Upload Document
                                </Fab>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <MUIDataTable
                            title={"Excel Import"}
                            data={tableData}
                            columns={columns}
                            options={options}
                        />
                    </Grid>
                  </Grid>  
                  </div>
            </Paper>
        </div>
    )
}

export default ExcelImport;