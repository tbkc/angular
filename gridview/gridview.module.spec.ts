import { GridviewModule } from './gridview.module';

describe('GridviewModule', () => {
  let gridviewModule: GridviewModule;

  beforeEach(() => {
    gridviewModule = new GridviewModule();
  });

  it('should create an instance', () => {
    expect(gridviewModule).toBeTruthy();
  });
});
