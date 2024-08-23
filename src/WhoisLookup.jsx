import React, { useState } from 'react';
import axios from 'axios';

const WhoisLookup = () => {
    const [domain, setDomain] = useState('');
    const [infoType, setInfoType] = useState('domain');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleLookup = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/whois`, {
                params: { domain }
            });
            setData(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to retrieve WHOIS data.');
            setData(null);
        }
    };

    const renderTable = () => {
        if (!data) return null;

        if (infoType === 'domain') {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Domain Name</td>
                            <td>{data.domain_name}</td>
                        </tr>
                        <tr>
                            <td>Registrar</td>
                            <td>{data.registrar}</td>
                        </tr>
                        <tr>
                            <td>Registration Date</td>
                            <td>{data.registration_date}</td>
                        </tr>
                        <tr>
                            <td>Expiration Date</td>
                            <td>{data.expiration_date}</td>
                        </tr>
                        <tr>
                            <td>Estimated Domain Age</td>
                            <td>{data.estimated_domain_age}</td>
                        </tr>
                        <tr>
                            <td>Hostnames</td>
                            <td>{data.hostnames.join(', ')}</td>
                        </tr>
                    </tbody>
                </table>
            );
        } else if (infoType === 'contact') {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Registrant Name</td>
                            <td>{data.contact_information.registrant_name}</td>
                        </tr>
                        <tr>
                            <td>Technical Contact Name</td>
                            <td>{data.contact_information.technical_contact_name}</td>
                        </tr>
                        <tr>
                            <td>Administrative Contact Name</td>
                            <td>{data.contact_information.administrative_contact_name}</td>
                        </tr>
                        <tr>
                            <td>Contact Email</td>
                            <td>{data.contact_information.contact_email}</td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    };

    return (
        <div>
            <h1>WHOIS Lookup</h1>
            <input
                type="text"
                placeholder="Enter domain name"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
            />
            <select value={infoType} onChange={(e) => setInfoType(e.target.value)}>
                <option value="domain">Domain Information</option>
                <option value="contact">Contact Information</option>
            </select>
            <button onClick={handleLookup}>Lookup</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {renderTable()}
        </div>
    );
};

export default WhoisLookup;
