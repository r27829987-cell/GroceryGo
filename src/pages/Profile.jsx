import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBBadge,
  MDBFile,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';
import { mockOrders, mockSubscriptions } from '../utils/mockData';

const TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Kolkata',
  'Asia/Tokyo',
];

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  // Breakdown name into first/last
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [timezone, setTimezone] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [newAddress, setNewAddress] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) return;
    const parts = (user.name || '').split(' ');
    setFirstName(parts[0] || '');
    setLastName(parts.slice(1).join(' ') || '');
    setPhone(user.phone || '');
    setTimezone(user.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
    setLinkedIn(user.linkedIn || '');
    setProfilePicPreview(user.profilePicture || null);
  }, [user]);

  if (!user) return <div className="container my-4">No user data</div>;

  const initials = (user.name || user.email || 'U').split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();

  const validate = () => {
    const e = {};
    if (!firstName.trim()) e.firstName = 'First name is required';
    if (phone && !/^\+?[0-9\s-]{7,}$/.test(phone)) e.phone = 'Invalid phone number';
    if (linkedIn && !/^https?:\/\//.test(linkedIn)) e.linkedIn = 'LinkedIn must be a full URL (https://...)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProfilePicPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!validate()) return;
    const name = `${firstName.trim()}${lastName ? ' ' + lastName.trim() : ''}`;
    const updates = {
      name,
      phone: phone.trim(),
      timezone,
      linkedIn: linkedIn.trim(),
    };
    if (profilePicPreview) updates.profilePicture = profilePicPreview;
    updateUser(updates);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    // reset fields to user
    const parts = (user.name || '').split(' ');
    setFirstName(parts[0] || '');
    setLastName(parts.slice(1).join(' ') || '');
    setPhone(user.phone || '');
    setTimezone(user.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
    setLinkedIn(user.linkedIn || '');
    setProfilePicPreview(user.profilePicture || null);
    setErrors({});
  };

  const handleAddAddress = () => {
    if (!newAddress.trim()) return;
    const addresses = Array.isArray(user.addresses) ? [...user.addresses, newAddress.trim()] : [newAddress.trim()];
    updateUser({ addresses });
    setNewAddress('');
  };

  const handleRemoveAddress = (idx) => {
    const addresses = (user.addresses || []).filter((_, i) => i !== idx);
    updateUser({ addresses });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const profileImg = profilePicPreview;

  return (
    <MDBContainer className="my-5">
      <MDBRow className="g-4">
        <MDBCol md="4">
          <MDBCard className="text-center shadow-sm">
            <MDBCardBody>
              {profileImg ? (
                <img src={profileImg} alt="avatar" className="mb-3 rounded-circle" style={{ width: 96, height: 96, objectFit: 'cover' }} />
              ) : (
                <div
                  className="mb-3 mx-auto rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                  style={{ width: '96px', height: '96px', fontSize: '32px' }}
                >
                  {initials}
                </div>
              )}

              <h4 className="mb-1">{user.name}</h4>
              <p className="text-muted mb-2">{user.email}</p>
              <div className="mb-3">
                <MDBBadge color={user.role === 'admin' ? 'danger' : 'primary'}>
                  {user.role?.toUpperCase()}
                </MDBBadge>
                <MDBBadge className="ms-2" color="success">Member</MDBBadge>
              </div>

              <div className="d-grid gap-2">
                {!editing ? (
                  <MDBBtn color="outline-primary" onClick={() => setEditing(true)}>
                    <MDBIcon fas icon="user-edit" className="me-2" /> Edit Profile
                  </MDBBtn>
                ) : (
                  <div className="d-flex gap-2">
                    <MDBBtn color="primary" onClick={handleSave}><MDBIcon fas icon="save" className="me-2" />Save</MDBBtn>
                    <MDBBtn color="secondary" onClick={handleCancel}><MDBIcon fas icon="times" className="me-2" />Cancel</MDBBtn>
                  </div>
                )}
                <MDBBtn color="danger" onClick={handleLogout}>
                  <MDBIcon fas icon="sign-out-alt" className="me-2" /> Logout
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>

          <MDBCard className="mt-4 shadow-sm">
            <MDBCardBody>
              <h6 className="mb-3">Quick Stats</h6>
              <div className="d-flex justify-content-between">
                <Link to="/orders" className="text-decoration-none text-reset">
                  <div>
                    <h5 className="mb-0">{(user.orders && user.orders.length) || mockOrders.length || 0}</h5>
                    <small className="text-muted">Orders</small>
                  </div>
                </Link>
                <Link to="/subscriptions" className="text-decoration-none text-reset">
                  <div>
                    <h5 className="mb-0">{(user.subscriptions && user.subscriptions.length) || mockSubscriptions.length || 0}</h5>
                    <small className="text-muted">Active Subscriptions</small>
                  </div>
                </Link>
                <Link to="/saved" className="text-decoration-none text-reset">
                  <div>
                    <h5 className="mb-0">{(user.savedItems && user.savedItems.length) || 0}</h5>
                    <small className="text-muted">Saved Items</small>
                  </div>
                </Link>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="8">
          <MDBCard className="shadow-sm">
            <MDBCardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Profile Details</h4>
              </div>

              <MDBRow className="mb-3">
                <MDBCol md="6">
                  <label className="form-label small text-muted">First Name</label>
                  <MDBInput value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={!editing} />
                  {errors.firstName && <div className="text-danger small mt-1">{errors.firstName}</div>}
                </MDBCol>
                <MDBCol md="6">
                  <label className="form-label small text-muted">Last Name</label>
                  <MDBInput value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={!editing} />
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-3">
                <MDBCol md="6">
                  <label className="form-label small text-muted">Email</label>
                  <MDBInput value={user.email} disabled />
                </MDBCol>
                <MDBCol md="6">
                  <label className="form-label small text-muted">Phone Number</label>
                  <MDBInput value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!editing} />
                  {errors.phone && <div className="text-danger small mt-1">{errors.phone}</div>}
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-3">
                <MDBCol md="6">
                  <label className="form-label small text-muted">Time Zone</label>
                  <select className="form-select" value={timezone} onChange={(e) => setTimezone(e.target.value)} disabled={!editing}>
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </MDBCol>
                <MDBCol md="6">
                  <label className="form-label small text-muted">LinkedIn</label>
                  <MDBInput value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} disabled={!editing} />
                  {errors.linkedIn && <div className="text-danger small mt-1">{errors.linkedIn}</div>}
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-3">
                <MDBCol md="6">
                  <label className="form-label small text-muted">Profile Picture</label>
                  <div className="d-flex align-items-center gap-2">
                    <MDBFile onChange={handleFileChange} accept="image/*" />
                    <small className="text-muted">PNG/JPG (max 2MB)</small>
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <label className="form-label small text-muted">Address</label>
                  <div>
                    <a href="#addresses">Manage Addresses</a>
                  </div>
                </MDBCol>
              </MDBRow>

              <hr />

              <h6 id="addresses">Addresses</h6>
              <MDBListGroup className="mb-3">
                {(user.addresses || []).length === 0 && (
                  <MDBListGroupItem>No saved addresses</MDBListGroupItem>
                )}
                {(user.addresses || []).map((addr, idx) => (
                  <MDBListGroupItem key={idx} className="d-flex justify-content-between align-items-center">
                    <div>{addr}</div>
                    <div>
                      <MDBBtn size="sm" color="link" onClick={() => handleRemoveAddress(idx)}>
                        <MDBIcon fas icon="trash" />
                      </MDBBtn>
                    </div>
                  </MDBListGroupItem>
                ))}
              </MDBListGroup>

              <div className="d-flex gap-2 mb-3">
                <MDBInput placeholder="Add new address" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
                <MDBBtn onClick={handleAddAddress}>Add</MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
