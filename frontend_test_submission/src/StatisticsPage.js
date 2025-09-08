import React, { useState } from 'react';


// Real Logging Middleware function
async function logEvent(stack, level, packageName, message) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiMjJjczE2NUBraXRzdy5hYy5pbiIsImV4cCI6MTc1NzMxMDAxNywiaWF0IjoxNzU3MzA5MTE3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiY2U0MWU0YmEtMWZhZi00YWU3LWI0MzYtYTYyNzZmMjdhZjdlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidmlrYXMgdmVtdWxhIiwic3ViIjoiMDcxMTE3YzUtMDYwNi00ODZhLTk3MWUtYTljNDczMTg5YjM3In0sImVtYWlsIjoiYjIyY3MxNjVAa2l0c3cuYWMuaW4iLCJuYW1lIjoidmlrYXMgdmVtdWxhIiwicm9sbE5vIjoiYjIyY3MxNjUiLCJhY2Nlc3NDb2RlIjoicXFRelprIiwiY2xpZW50SUQiOiIwNzExMTdjNS0wNjA2LTQ4NmEtOTcxZS1hOWM0NzMxODliMzciLCJjbGllbnRTZWNyZXQiOiJHcHVUaERnUndtaEhqRWVjIn0.hm0swQotSm8Nt-Gm-NzBp8UUAXqJwKT-91xkeIyriEs';
  try {
    await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ stack, level, package: packageName, message })
    });
  } catch (err) {
    // Optionally handle logging errors
  }
}

export default function StatisticsPage({ urls }) {
  // Simulate click data for demonstration
  const [clickData, setClickData] = useState(urls.map(url => ({
    ...url,
    clicks: Math.floor(Math.random() * 10),
    details: Array.from({ length: Math.floor(Math.random() * 10) }, (_, i) => ({
      timestamp: new Date(Date.now() - Math.random() * 10000000).toLocaleString(),
      source: ['web', 'email', 'sms'][Math.floor(Math.random() * 3)],
      location: ['India', 'USA', 'Europe'][Math.floor(Math.random() * 3)]
    }))
  })));

  return (
    <div>
      <h2>URL Shortener Statistics</h2>
      {clickData.length === 0 ? (
        <p>No URLs shortened yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Created</th>
              <th>Expiry</th>
              <th>Total Clicks</th>
              <th>Click Details</th>
            </tr>
          </thead>
          <tbody>
            {clickData.map((url, idx) => (
              <tr key={idx}>
                <td><a href={url.short} target="_blank" rel="noopener noreferrer">{url.short}</a></td>
                <td>{url.created || '-'}</td>
                <td>{url.expiry}</td>
                <td>{url.clicks}</td>
                <td>
                  <ul>
                    {url.details.map((d, i) => (
                      <li key={i}>
                        {d.timestamp} | {d.source} | {d.location}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
