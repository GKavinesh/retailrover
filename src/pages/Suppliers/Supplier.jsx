import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/sidebar/Sidebar.jsx';
import Navbar from '../../components/navbar/Navbar.jsx';
import './Supplier.scss';
import PostSupplier from './postSupplier.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReactToPrint } from 'react-to-print';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const componentPDF = useRef();
  const [filterBy, setFilterBy] = useState('Name');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/supplier');
      const suppliers = await response.json();
      setSuppliers(suppliers);
      setFilteredSuppliers(suppliers);
    } catch (error) {
      console.error('Error fetching suppliers:', error.message);
    }
  };

  const handleDelete = async (supplierId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/supplier/${supplierId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setSuppliers((prevSuppliers) =>
          prevSuppliers.filter((supplier) => supplier.id !== supplierId)
        );
      }

      console.log(`Supplier with ID ${supplierId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting supplier:', error.message);
    }
  };

  const handleUpdate = (supplierId) => {
    navigate(`/supplier/${supplierId}`);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredSuppliers(
      suppliers.filter((item) =>
        Object.values(item).some((value) => value.toString().toLowerCase().includes(query.toLowerCase()))
      )
    );
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'supplier data',
    onAfterPrint: () => alert('The report has been generated'),
    contentStyle: `
      @media print {
        .action-buttons {
          display: none;
        }
      }
    `
  });

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Container className="mt-5">
          <Row>
            <Col>
              <h1 className="text-center">Our Suppliers</h1>
              <Button variant="primary" onClick={fetchSuppliers}>
                Refresh Table
              </Button>
              <div className="search-bar" style={{ marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="form-control"
                />
              </div>
              <Dropdown style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" drop="end">
                  Filter By: {filterBy}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFilterBy('Name')}>Name</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterBy('Product')}>Product</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterBy('Address')}>Address</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterBy('Email')}>Email</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <div ref={componentPDF} style={{ width: '100%' }}>
                <Table striped bordered hover responsive className="mt-3">
                  <thead>
                    <tr>
                      <th>
                        <span onClick={() => requestSort('supplier_name')} className={getClassNamesFor('supplier_name')}>
                          Name
                        </span>
                      </th>
                      <th>
                        <span onClick={() => requestSort('product_name')} className={getClassNamesFor('product_name')}>
                          Product
                        </span>
                      </th>
                      <th>
                        <span onClick={() => requestSort('address')} className={getClassNamesFor('address')}>
                          Address
                        </span>
                      </th>
                      <th>
                        <span onClick={() => requestSort('email')} className={getClassNamesFor('email')}>
                          Email
                        </span>
                      </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSuppliers.map((supplier) => (
                      <tr key={supplier.id}>
                        <td>{supplier.supplier_name}</td>
                        <td>{supplier.product_name}</td>
                        <td>{supplier.address}</td>
                        <td>{supplier.email}</td>
                        <td className="action-buttons">
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleUpdate(supplier.id)}
                             // Green background and border
                          >
                            <BorderColorIcon />
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => handleDelete(supplier.id)}
                            // Red background and border
                          >
                            <DeleteIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <button className="btn btn-success" onClick={generatePDF}>
                Generate Report
              </button>
            </Col>
            <Col sm={4}>
              <PostSupplier />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Supplier;



