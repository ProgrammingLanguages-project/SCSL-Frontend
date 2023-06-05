function formatText(translation) {
  const text = translation.split('\n');
  return text.map((line, i) => <div key={i}>{line}</div>);
}

// eslint-disable-next-line react/prop-types
export function Translation({ translation }) {
  const elements = formatText(translation);
  return (
    <div className='main-component-node container rounded border p-0 mt-3 width bg-info-subtle border-success-subtle'>
      <div className='custom-node__header border-bottom'>
        <div className='h5'>Translation</div>
      </div>
      <div className='bg-white' style={{ maxWidth: '450px' }}>
        {elements}
      </div>
    </div>
  );
}
