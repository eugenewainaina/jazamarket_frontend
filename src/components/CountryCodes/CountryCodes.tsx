import React from 'react';

const CountryCodes: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ value, onChange }) => {
  const countries = [
    { code: '+254', name: 'Kenya' },
    { code: '+1', name: 'USA' },
    { code: '+44', name: 'UK' },
    { code: '+255', name: 'Tanzania' },
    { code: '+256', name: 'Uganda' },
  ];

  return (
    <select value={value} onChange={onChange}>
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name} ({country.code})
        </option>
      ))}
    </select>
  );
};

export default CountryCodes;
