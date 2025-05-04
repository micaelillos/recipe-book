// Sample test to verify Jest setup
describe('Sample Test', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should pass an async test', async () => {
    const data = await Promise.resolve('test');
    expect(data).toBe('test');
  });
}); 