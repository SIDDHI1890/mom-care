import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ref, update } from 'firebase/database';
import { database } from '../firebase-config';
import { toast } from 'react-toastify';
import { 
  FaSignOutAlt, FaUser, FaEnvelope, FaPhone, 
  FaWeight, FaHistory, FaPencilAlt, FaSave, FaTimes,
  FaHeartbeat, FaBaby, FaCalendarCheck
} from 'react-icons/fa';
import Cookies from "js-cookie";

function Dashboard(props) {
  const { user, onLogout } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...user });

  useEffect(() => {
    props.setisFixed(false);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const userRef = ref(database, `MaternalHealthSystem/users/${user.phone}`);
      await update(userRef, {
        ...editedData,
        phone: user.phone
      });
      const userDataForCookie = {
        ...editedData,
        phone: user.phone 
      }
      Cookies.set("user", JSON.stringify(userDataForCookie), { expires: 7 });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Update failed: ' + error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const stats = [
    
  ];

  return (
    <div className="min-vh-100 py-5 bg-light">
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Banner */}
        <motion.div 
          className="card mb-4 border-0 bg-primary text-white shadow-lg"
          style={{
            borderRadius: "20px",
            background: "linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)"
          }}
        >
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1 className="display-6 fw-bold mb-3">Welcome back, {user.name}!</h1>
                <p className="lead mb-0">Track your pregnancy journey with us</p>
              </div>
              <div className="col-md-6">
                <div className="row g-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="col-md-4">
                      <div className="card bg-white bg-opacity-25 border-0">
                        <div className="card-body text-center p-3">
                          <stat.icon className={`${stat.color} mb-2`} size={24} />
                          <h6 className="mb-1">{stat.label}</h6>
                          <h4 className="mb-0 fw-bold">{stat.value}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Section */}
        <motion.div 
          className="card border-0 shadow-lg"
          style={{ borderRadius: "20px" }}
          whileHover={{ boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
        >
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0 text-primary fw-bold">Profile Information</h4>
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline-primary rounded-pill px-4"
                  onClick={handleEdit}
                >
                  <FaPencilAlt className="me-2" />
                  Edit Profile
                </motion.button>
              ) : (
                <div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-success rounded-pill px-4 me-2"
                    onClick={handleSave}
                  >
                    <FaSave className="me-2" />
                    Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-outline-danger rounded-pill px-4"
                    onClick={() => setIsEditing(false)}
                  >
                    <FaTimes className="me-2" />
                    Cancel
                  </motion.button>
                </div>
              )}
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${isEditing ? '' : 'bg-light'}`}
                    id="name"
                    name="name"
                    value={isEditing ? editedData.name : user.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Name"
                  />
                  <label htmlFor="name">
                    <FaUser className="me-2 text-primary" />
                    Full Name
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="number"
                    className={`form-control ${isEditing ? '' : 'bg-light'}`}
                    id="age"
                    name="age"
                    value={isEditing ? editedData.age : user.age}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Age"
                  />
                  <label htmlFor="age">
                    <FaUser className="me-2 text-primary" />
                    Age
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="email"
                    className={`form-control ${isEditing ? '' : 'bg-light'}`}
                    id="email"
                    name="email"
                    value={isEditing ? editedData.email : user.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Email"
                  />
                  <label htmlFor="email">
                    <FaEnvelope className="me-2 text-primary" />
                    Email Address
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="tel"
                    className="form-control bg-light"
                    id="phone"
                    value={user.phone}
                    disabled
                    placeholder="Phone"
                  />
                  <label htmlFor="phone">
                    <FaPhone className="me-2 text-primary" />
                    Phone Number
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="number"
                    className={`form-control ${isEditing ? '' : 'bg-light'}`}
                    id="currentWeight"
                    name="currentWeight"
                    value={isEditing ? editedData.currentWeight : user.currentWeight}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Weight"
                  />
                  <label htmlFor="currentWeight">
                    <FaWeight className="me-2 text-primary" />
                    Current Weight (kg)
                  </label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className={`form-control ${isEditing ? '' : 'bg-light'}`}
                    id="medicalHistory"
                    name="medicalHistory"
                    value={isEditing ? editedData.medicalHistory : user.medicalHistory}
                    onChange={handleChange}
                    disabled={!isEditing}
          
                    style={{ height: "120px" }}
                  />
  
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Dashboard;