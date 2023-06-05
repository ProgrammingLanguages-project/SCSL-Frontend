import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Link = ({ onElementPropsChange }) => {
  const [linkProps, setLinkProps] = useState({
    href: '',
    id: '',
    xxcontent: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const newLinkProps = { ...linkProps, [name]: `°${value}°;` };
    onElementPropsChange(newLinkProps);
    setLinkProps(newLinkProps);
  };

  return (
    <>
      <div className='input-group'>
        <span className='input-group-text' id='basic-addon2'>
          Link:{' '}
        </span>
        <input
          type='text'
          className='form-control nodrag'
          placeholder='www.mylink.com'
          aria-label='www.mylink.com'
          aria-describedby='basic-addon2'
          name='href'
          onChange={onChange}
        />
      </div>
      <div className='input-group'>
        <span className='input-group-text' id='basic-addon2'>
          Message:{' '}
        </span>
        <input
          type='text'
          className='form-control nodrag'
          placeholder='A funny animal video'
          aria-label='A funny animal video'
          aria-describedby='basic-addon2'
          name='xxcontent'
          onChange={onChange}
        />
      </div>
      <div className='input-group'>
        <span className='input-group-text' id='basic-addon2'>
          Tag:{' '}
        </span>
        <input
          type='text'
          className='form-control nodrag'
          placeholder='My hyperlink'
          aria-label='My hyperlink'
          aria-describedby='basic-addon2'
          name='id'
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default Link;
