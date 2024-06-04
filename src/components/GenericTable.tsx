import { ThemeProvider, createTheme } from "@mui/material";
import MUIDataTable from "mui-datatables";

interface GenericTableProps {
    data: any;
    columns: { name: string; label: string }[];
    title: string;
    options?: any;
}

const genericOptions = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5],
    responsive: "standard",
};

// Customization styles for the Data table:
const genericTableTheme = createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: {
                    padding: "10px 10px",
                    color: "grey",
                },
                body: {
                    padding: "15px 20px",
                    color: "black",
                    ":first-of-type": {
                        // Target first cell within each row
                        paddingLeft: "40px",
                    },
                },

                footer: {
                    border: "none",
                },
            },
        },
        MuiIconButton: {
            // Icon button customization
            styleOverrides: {
                root: {
                    "&:active": {
                        outline: "none",
                    },
                },
            },
        },
        MuiTableSortLabel: {
            // Target sort labels
            styleOverrides: {
                root: {
                    "&:hover": {
                        outline: "none",
                    },
                    "&.Mui-active": {
                        outline: "none",
                    },
                },
            },
        },
        MuiButton: {
            // Target buttons within the table
            styleOverrides: {
                root: {
                    "&:focus": {
                        outline: "none",
                    },
                    "&:active": {
                        outline: "none !important",
                    },
                },
            },
        },
    },
});

const GenericTable: React.FC<GenericTableProps> = ({
    data,
    columns,
    title,
    options,
}) => {
    return (
        <ThemeProvider theme={genericTableTheme}>
            <MUIDataTable
                columns={columns}
                data={data}
                title={title}
                options={options ? options : genericOptions}
            />
        </ThemeProvider>
    );
};

export default GenericTable;
