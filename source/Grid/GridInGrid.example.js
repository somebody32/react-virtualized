import React, { Component, PropTypes } from 'react';
import { ContentBox, ContentBoxHeader, ContentBoxParagraph } from '../demo/ContentBox'
import AutoSizer from '../AutoSizer';
import Grid from './Grid';

import styles from './GridInGrid.example.css';

const COL_WIDTH = 26;
const ROW_HEIGHT = 34;
const COLS = 100;
const grid_width = COL_WIDTH * COLS;
const ROWS_NUMBER = 100;
const rows = Array.apply(null, {length: ROWS_NUMBER}).map(Function.call, n =>  n * 20);

const GRID_BG_COLOR = 'rgb(255, 255, 255)';
const GRID_WEEKEND_BG_COLOR = 'rgb(246, 246, 246)';

const colColor = (is_workday) => {
  if (is_workday) return GRID_BG_COLOR;
  return GRID_WEEKEND_BG_COLOR;
};

export default class GridInGridExample extends Component {
  constructor() {
    super()
    this.renderCol = this.renderCol.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  renderCol({columnIndex}) {
    const is_workday = columnIndex % 7 < 5;
    return <div className={styles.col} style={{backgroundColor: colColor(is_workday)}} />
  }

  renderRow({rowIndex}) {
    const transform = `translatex(${rows[rowIndex]}px)`;
    const width = rows[rowIndex];
    return <div className={styles.row} style={{transform, width}} />
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              rowsCount={1}
              width={width}
              height={height}
              columnWidth={COL_WIDTH}
              columnsCount={COLS}
              rowHeight={height}
              renderCell={this.renderCol}
            >
            <Grid
              style={{position: 'absolute', top: 0}}
              rowsCount={rows.length}
              width={grid_width}
              height={height}
              overscanRowsCount={15}
              columnWidth={grid_width - 50}
              columnsCount={1}
              rowHeight={ROW_HEIGHT}
              renderCell={this.renderRow} />
            </Grid>
          )}
        </AutoSizer>
      </div>
    );
  }
}
