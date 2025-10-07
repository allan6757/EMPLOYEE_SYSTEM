# Data Flow Diagram (DFD)
## Nairobi Registration Bureau - Employee System

## Level 0 - Context Diagram

```mermaid
flowchart TD
    C[Citizens] --> S[Registration Bureau System]
    E[Employees] --> S
    A[Admin] --> S
    S --> C
    S --> E
    S --> A
    S --> DB[(Database)]
    S --> EXT[External Services]
```

## Level 1 - System Overview

```mermaid
flowchart TD
    C[Citizens] --> P1[Authentication Process]
    C --> P2[Service Request Process]
    C --> P3[Document Tracking Process]
    
    E[Employees] --> P4[Employee Login Process]
    E --> P5[Service Processing]
    E --> P6[Queue Management]
    
    A[Admin] --> P7[Admin Management]
    A --> P8[System Monitoring]
    
    P1 --> D1[(User Database)]
    P2 --> D2[(Service Records)]
    P3 --> D3[(Document Database)]
    P4 --> D4[(Employee Database)]
    P5 --> D2
    P6 --> D5[(Queue Database)]
    P7 --> D1
    P7 --> D4
    P8 --> D2
    P8 --> D5
```

## Level 2 - Detailed Process Flow

```mermaid
flowchart TD
    subgraph "Citizen Services"
        C1[Login/Register] --> C2[Select Service]
        C2 --> C3[Book Appointment]
        C2 --> C4[Check Document Status]
        C2 --> C5[Report Lost ID]
        C3 --> C6[Join Queue]
        C4 --> C7[View Digital ID]
        C5 --> C8[File Report]
    end
    
    subgraph "Employee Operations"
        E1[Employee Login] --> E2[Access Dashboard]
        E2 --> E3[Process Citizens]
        E2 --> E4[Manage Queue]
        E2 --> E5[Update Records]
        E3 --> E6[Verify Identity]
        E3 --> E7[Process Service]
        E4 --> E8[Call Next Citizen]
    end
    
    subgraph "Admin Functions"
        A1[Admin Login] --> A2[System Overview]
        A2 --> A3[Manage Employees]
        A2 --> A4[Monitor Booths]
        A2 --> A5[View Reports]
        A3 --> A6[Add/Remove Staff]
        A4 --> A7[Booth Status]
        A5 --> A8[Generate Analytics]
    end
    
    subgraph "Data Stores"
        D1[(Citizens)]
        D2[(Employees)]
        D3[(Booths)]
        D4[(Appointments)]
        D5[(Documents)]
        D6[(Queue)]
        D7[(Service Records)]
    end
    
    C1 --> D1
    C3 --> D4
    C4 --> D5
    C5 --> D7
    C6 --> D6
    
    E1 --> D2
    E3 --> D1
    E5 --> D7
    E6 --> D1
    E8 --> D6
    
    A1 --> D2
    A3 --> D2
    A4 --> D3
    A6 --> D2
    A7 --> D3
    A8 --> D7
```

## Data Flow Details

### External Entities
- **Citizens**: End users seeking registration services
- **Employees**: Staff operating service booths
- **Admin**: System administrators and managers

### Processes
1. **Authentication Process**: User login and verification
2. **Service Request Process**: Citizens requesting services
3. **Document Tracking Process**: Monitoring document production
4. **Employee Login Process**: Staff authentication
5. **Service Processing**: Handling citizen requests
6. **Queue Management**: Managing citizen queues
7. **Admin Management**: System administration
8. **System Monitoring**: Performance and analytics

### Data Stores
- **User Database**: Authentication and profile data
- **Service Records**: Transaction history
- **Document Database**: Document production tracking
- **Employee Database**: Staff information
- **Queue Database**: Real-time queue status