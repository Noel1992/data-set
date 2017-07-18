const {
  expect
} = require('chai');
const {
  DataSet,
  DataView,
  getTransform
} = require('../../../index');

describe('DataView.transform(): proportion', () => {
  const dataSet = new DataSet();
  const data = [
    { x: 1, y: 1, z: 1 },
    { x: 2, y: 1, z: 2 },
    { x: 3, y: 1, z: 3 },
    { x: 4, y: 1, z: 4 },
    { x: 1, y: 2, z: 5 },
    { x: 2, y: 2, z: 6 },
    { x: 3, y: 2, z: 7 },
    { x: 4, y: 2, z: 8 }
  ];
  let dataView;

  beforeEach(() => {
    dataView = new DataView(dataSet);
    dataView.source(data);
  });

  it('api', () => {
    expect(getTransform('proportion')).to.be.a('function');
    expect(() => {
      dataView.transform({
        type: 'proportion'
      });
    }).to.throw();
  });

  it('default', () => {
    dataView.transform({
      type: 'proportion',
      field: 'z',
      dimension: 'y'
    });
    expect(dataView.rows.length).to.equal(2);
    expect(dataView.rows[0]).to.eql({
      y: 1,
      _proportion: 0.5
    });
  });

  it('as', () => {
    dataView.transform({
      type: 'proportion',
      field: 'z',
      dimension: 'y',
      as: '_z'
    });
    expect(dataView.rows.length).to.equal(2);
    expect(dataView.rows[0]).to.eql({
      y: 1,
      _z: 0.5
    });
  });

  it('groupBy', () => {
    dataView.transform({
      type: 'proportion',
      field: 'z',
      dimension: 'y',
      groupBy: [ 'x' ],
      as: '_z'
    });
    expect(dataView.rows.length).to.equal(8);
    expect(dataView.rows[0]).to.eql({
      x: 1,
      y: 1,
      _z: 0.5
    });
  });
});