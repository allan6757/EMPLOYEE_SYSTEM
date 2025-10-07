# Nairobi Registration Bureau - Booth Management & Service System

A comprehensive digital identity management system for the Nairobi Registration Bureau, built with React and Vite. This system manages citizen services, employee operations, and administrative oversight for national ID registration and related services.

## 🚀 Features

### 🏛️ Multi-Portal System
- **Citizen Services Portal** - Book appointments, access digital ID, report lost documents
- **Employee Dashboard** - Manage booth operations, process citizen requests
- **Admin Panel** - System oversight, booth management, employee administration
- **Registration Portal** - New citizen registration with biometric support

### 🔐 Security Features
- Multi-level authentication system
- Security key protection for staff access
- Biometric key generation and search
- Fraud detection and alerts
- Digital ID with security features (hologram, watermark, RFID chip)

### 📱 Digital Services
- Digital ID display with QR codes
- Document production tracking
- Lost ID reporting system
- Real-time chat communication
- Appointment booking system

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: CSS-in-JS with global styles
- **State Management**: React Hooks + Local Storage
- **Authentication**: Custom multi-level auth system

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd Attendance-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔑 Mock Accounts & Test Data

### 🌟 Main System Login
**Demo Account:**
- **Email**: `james.mwangi@email.com`
- **Password**: `kenya123`

**Or Create Your Own Account:**
- Click "CREATE ACCOUNT" on the login screen
- Fill in your details and create a secure password
- Your account will be automatically activated

### 🔒 Security Keys
- **Admin Password**: `allan123`
- **Security Key**: `ALLAN123` (Required for employee/admin access)

### 👥 Employee Accounts

| Employee ID | Name | Password | Booth ID | Booth Name |
|-------------|------|----------|----------|------------|
| EMP001 | ALLAN MAINA | emp123 | B002 | Replacement Services Booth |
| EMP002 | MARY WANJIKU | emp456 | B001 | ID Verification Booth 1 |
| EMP003 | JOHN KAMAU | emp789 | B003 | Correction Services Booth |

### 🏢 Service Booths

| Booth ID | Name | Service Type |
|----------|------|--------------|
| B001 | ID Verification Booth 1 | new-id |
| B002 | Replacement Services Booth | replacement |
| B003 | Correction Services Booth | correction |

### 👤 Citizen Test Accounts

#### Active Citizens
1. **JAMES MWANGI**
   - ID Number: `12345678`
   - Phone: `0712345678`
   - Email: `james.mwangi@email.com`
   - Status: Active
   - Biometric Key: `BIO-12345678-2024`

2. **MARY WANJIKU**
   - ID Number: `99887766`
   - Phone: `0745678901`
   - Email: `mary.wanjiku@email.com`
   - Status: Active
   - Biometric Key: `BIO-99887766-2024`

3. **DAVID OTIENO**
   - ID Number: `55443322`
   - Phone: `0756789012`
   - Email: `david.otieno@email.com`
   - Status: Active
   - Biometric Key: `BIO-55443322-2024`

#### Citizens Requiring Renewal
4. **GRACE NJERI**
   - ID Number: `87654321`
   - Phone: `0723456789`
   - Email: `grace.njeri@email.com`
   - Status: Expires Soon
   - Biometric Key: `BIO-87654321-2024`

5. **PETER KIPROTICH**
   - ID Number: `11223344`
   - Phone: `0734567890`
   - Email: `peter.kiprotich@email.com`
   - Status: Expired
   - Biometric Key: `BIO-11223344-2020`

### 📄 Document Production Status

| Document ID | Citizen | ID Number | Document Type | Status | Stage |
|-------------|---------|-----------|---------------|--------|-------|
| 1 | JAMES MWANGI | 12345678 | National ID | Completed | Ready |
| 2 | GRACE NJERI | 87654321 | ID Replacement | In Production | Production |

## 🎯 How to Use the System

### 1. Initial Login
**Option A - Create New Account:**
1. Click "CREATE ACCOUNT" on the login screen
2. Fill in your personal details (name, email, phone, ID number)
3. Create a secure password (8+ chars, uppercase, lowercase, number)
4. Agree to terms and click "CREATE ACCOUNT"
5. You'll be automatically logged in

**Option B - Use Demo Account:**
1. Use demo credentials: `james.mwangi@email.com` / `kenya123`
2. This grants access to the main service portal

### 2. Citizen Services
- Click "Citizen Services" → Login with ID Number + Phone Number
- Example: ID `12345678` + Phone `0712345678`
- Access digital ID, book appointments, report lost documents

### 3. Employee Access
- Click "Employee Login" → Enter security key `ALLAN123`
- Login with Booth ID + Password (e.g., `B002` + `emp123`)
- Manage booth operations and citizen requests

### 4. Admin Access
- Click "Admin Panel" → Enter security key `ALLAN123`
- Enter admin password `allan123`
- Full system management capabilities

### 5. Registration Portal
- Click "Registration" to register new citizens
- No authentication required for new registrations

## 🔍 Key Features Demonstration

### Biometric Search
- Available in Admin and Employee dashboards
- Search by ID number or citizen name
- Returns biometric keys and citizen details

### Digital ID Features
- QR code generation
- Security features display
- Status indicators (Active/Expired/Expires Soon)

### Chat System
- Real-time communication between employees and admin
- Message history persistence
- Reply functionality

### Fraud Detection
- Automatic checks during registration
- Duplicate detection
- Security alerts

## 📁 Project Structure

```
src/
├── components/
│   ├── Admin/           # Admin dashboard components
│   ├── Auth/            # Authentication components
│   ├── Citizen/         # Citizen service components
│   ├── Employee/        # Employee dashboard components
│   ├── Layout/          # Shared layout components
│   └── Registration/    # Registration form components
├── hooks/               # Custom React hooks
├── styles/              # Global styling
├── utils/               # Helper functions
└── App.jsx             # Main application component
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Key Dependencies
- React 19.1.1
- React DOM 19.1.1
- Firebase 12.2.1 (for future cloud integration)
- Vite 7.1.2

## 🎨 UI/UX Features

- **Responsive Design** - Works on desktop and mobile
- **Dark Theme** - Professional dark interface
- **Kenyan Flag Colors** - Red, black, green, white color scheme
- **Glassmorphism Effects** - Modern UI with backdrop blur
- **Smooth Animations** - Transitions and hover effects
- **Accessibility** - Keyboard navigation and screen reader support

## 🔒 Security Implementation

- **Multi-layer Authentication** - Different access levels
- **Session Management** - Secure login/logout
- **Data Validation** - Input sanitization and validation
- **Fraud Prevention** - Automated security checks
- **Biometric Integration** - Secure identity verification

## 📱 Mobile Responsiveness

The system is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🚀 Future Enhancements

- Cloud database integration
- Real biometric scanner support
- SMS notifications
- Email integration
- Advanced reporting
- Multi-language support
- Offline mode capabilities

## 📞 Support

For technical support or questions about the system, contact the development team or refer to the inline help documentation within the application.

---

**Note**: This is a demonstration system with mock data. In production, all data would be securely stored in encrypted databases with proper backup and recovery systems.