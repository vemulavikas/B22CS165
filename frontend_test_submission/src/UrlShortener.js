import React, { useState } from 'react';

// Real Logging Middleware function
async function logEvent(stack, level, packageName, message) {
  // Replace with your actual token
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
    // console.error('Logging failed:', err);
  }
}

const defaultValidity = 30;

function validateUrl(url) {
  // Simple URL validation
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function validateShortcode(code) {
  return /^[a-zA-Z0-9]{1,20}$/.test(code);
}

export default function UrlShortener({ onShorten }) {
  const [inputs, setInputs] = useState(
    Array(5).fill({ url: '', validity: '', shortcode: '' })
  );
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleChange = (idx, field, value) => {
    const newInputs = [...inputs];
    newInputs[idx] = { ...newInputs[idx], [field]: value };
    setInputs(newInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    let shortcodes = new Set();
    let newResults = [];

    inputs.forEach((input, idx) => {
      if (!input.url) return;
      if (!validateUrl(input.url)) {
        newErrors.push(`Row ${idx + 1}: Invalid URL.`);
        logEvent('frontend', 'error', 'component', `Invalid URL: ${input.url}`);
        return;
      }
      let validity = input.validity ? parseInt(input.validity) : defaultValidity;
      if (isNaN(validity) || validity <= 0) {
        newErrors.push(`Row ${idx + 1}: Validity must be a positive integer.`);
        logEvent('frontend', 'error', 'component', `Invalid validity: ${input.validity}`);
        return;
      }
      let code = input.shortcode;
      if (code) {
        if (!validateShortcode(code)) {
          newErrors.push(`Row ${idx + 1}: Shortcode must be alphanumeric and <= 20 chars.`);
          logEvent('frontend', 'error', 'component', `Invalid shortcode: ${code}`);
          return;
        }
        if (shortcodes.has(code)) {
          newErrors.push(`Row ${idx + 1}: Shortcode must be unique.`);
          logEvent('frontend', 'error', 'component', `Duplicate shortcode: ${code}`);
          return;
        }
        shortcodes.add(code);
      } else {
        // Generate a random shortcode if not provided
        code = Math.random().toString(36).substring(2, 8);
        while (shortcodes.has(code)) {
          code = Math.random().toString(36).substring(2, 8);
        }
        shortcodes.add(code);
      }
      // Simulate shortening (replace with actual API call)
      const expiry = new Date(Date.now() + validity * 60000);
      newResults.push({
        original: input.url,
        short: `http://localhost:3000/${code}`,
        expiry: expiry.toLocaleString(),
        shortcode: code,
        validity
      });
      logEvent('frontend', 'info', 'component', `Shortened URL: ${input.url} -> ${code}`);
    });
    setErrors(newErrors);
    setResults(newResults);
    if (newResults.length > 0 && typeof onShorten === 'function') {
      // Add created time for statistics
      onShorten(newResults.map(r => ({ ...r, created: new Date().toLocaleString() })));
    }
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        {inputs.map((input, idx) => (
          <div key={idx} style={{ marginBottom: 10, borderBottom: '1px solid #eee', paddingBottom: 10 }}>
            <label>Long URL:</label>
            <input
              type="url"
              value={input.url}
              onChange={e => handleChange(idx, 'url', e.target.value)}
              required
            />
            <label> Validity (minutes):</label>
            <input
              type="number"
              value={input.validity}
              onChange={e => handleChange(idx, 'validity', e.target.value)}
              min="1"
            />
            <label> Shortcode:</label>
            <input
              type="text"
              value={input.shortcode}
              onChange={e => handleChange(idx, 'shortcode', e.target.value)}
              maxLength={20}
            />
          </div>
        ))}
        <button type="submit">Shorten URLs</button>
      </form>
      {errors.length > 0 && (
        <div className="error">
          <ul>
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}
      {results.length > 0 && (
        <div>
          <h3>Shortened URLs</h3>
          <table>
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Shortcode</th>
                <th>Expiry</th>
                <th>Validity (min)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, i) => (
                <tr key={i}>
                  <td>{res.original}</td>
                  <td><a href={res.short} target="_blank" rel="noopener noreferrer">{res.short}</a></td>
                  <td>{res.shortcode}</td>
                  <td>{res.expiry}</td>
                  <td>{res.validity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
