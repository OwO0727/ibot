import React, { useState, useEffect } from 'react';
import './PromotionManagement.css';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Table} from 'react-bootstrap';

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [filterParams, setFilterParams] = useState({
    period: '',
    status: '',
    name: '',
    createdBy: '',
  });

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get('/api/promotions');
      setPromotions(response.data);
      applyFilters(); 
    } catch (error) {
      console.error('Error fetching promotions: ', error);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilterParams({ ...filterParams, [name]: value });
  };

  const applyFilters = () => {
    let filtered = promotions.filter(promotion => {
      let isValid = true;
      for (let key in filterParams) {
        if (filterParams[key] && promotion[key] !== filterParams[key]) {
          isValid = false;
          break;
        }
      }
      return isValid;
    });
    setFilteredPromotions(filtered);
  };

  const handleFilterButtonClick = () => {
    applyFilters();
  };

  const handleCreatePromotion = () => {
    // Implement logic to navigate to the create promotion page
    console.log('Redirect to create promotion page');
  };

  const handleEditPromotion = (promotionId) => {
    // Implement logic to navigate to the edit promotion page with the promotionId
    console.log('Redirect to edit promotion page for promotion with ID:', promotionId);
  };

  const handleDeletePromotion = async (promotionId) => {
    try {
      await axios.delete(`/api/promotions/${promotionId}`);
      fetchPromotions();
    } catch (error) {
      console.error('Error deleting promotion:', error);
    }
  };


  return (
    <div>
      <h2>Promotion Summary</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Period / Date"
          value={filterParams.period}
          onChange={e => handleFilterChange('period', e.target.value)}
        />
        <input
          type="text"
          placeholder="Promotion Status"
          value={filterParams.status}
          onChange={e => handleFilterChange('status', e.target.value)}
        />
        <input
          type="text"
          placeholder="Promotion Name"
          value={filterParams.name}
          onChange={e => handleFilterChange('name', e.target.value)}
        />
        <input
          type="text"
          placeholder="Created By"
          value={filterParams.createdBy}
          onChange={e => handleFilterChange('createdBy', e.target.value)}
        />
        <Button onClick={handleFilterButtonClick}>Filter</Button>
      </div>

      <Button onClick={handleCreatePromotion}>Create Promotion</Button>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Daily Chat Period Start Time</th>
            <th>Daily Chat Period End Time</th>
            <th>Daily Max Contact Count</th>
            <th>Remain Called Count</th>
            <th>Status</th>
            <th>Hit Rate</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map(promotion => (
            <tr key={promotion.id}>
              <td>{promotion.name}</td>
              <td>{promotion.startDate}</td>
              <td>{promotion.endDate}</td>
              <td>{promotion.dailyChatPeriodStartTime}</td>
              <td>{promotion.dailyChatPeriodEndTime}</td>
              <td>{promotion.dailyMaxContactCount}</td>
              <td>{promotion.remainCalledCount}</td>
              <td>{promotion.status}</td>
              <td>{promotion.hitRate}</td>
            </tr>
          ))}

            {filteredPromotions.map(promotion => (
            <tr key={promotion.id}>
              {/* Render promotion details */}
              <td>{promotion.name}</td>
              <td>{promotion.startDate}</td>
              <td>{promotion.endDate}</td>
              <td>{promotion.status}</td>
              <td>
                <Button onClick={() => handleEditPromotion(promotion.id)}>Edit</Button>
                <Button onClick={() => handleDeletePromotion(promotion.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PromotionManagement;
