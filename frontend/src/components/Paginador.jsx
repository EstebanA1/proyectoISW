import Button from '@mui/material/Button';

const Pagination = ({ citasPerPage, totalCitas, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCitas / citasPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageClick = (pageNumber) => {
        paginate(pageNumber);
    };

    return (
        <nav>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                {pageNumbers.map((number) => (
                    <Button
                        key={number}
                        variant="outlined"
                        style={{ borderColor: 'white' }}

                        onMouseEnter={() => {
                        }}
                        onMouseLeave={() => {
                        }}
                        onClick={() => handlePageClick(number)}
                    >
                        {number}
                    </Button>
                ))}
            </div>
        </nav>
    );
};

export default Pagination;
