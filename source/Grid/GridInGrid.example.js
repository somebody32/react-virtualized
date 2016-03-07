import React, { Component, PropTypes } from 'react';
import { ContentBox, ContentBoxHeader, ContentBoxParagraph } from '../demo/ContentBox'
import AutoSizer from '../AutoSizer';
import Grid from './Grid';
import ScrollSync from '../ScrollSync/';

import styles from './GridInGrid.example.css';

const COL_WIDTH = 26;
const ROW_HEIGHT = 34;
const COLS = 100;
const grid_width = COL_WIDTH * COLS;
const ROWS_NUMBER = 100;
const rows = Array.apply(null, {length: ROWS_NUMBER}).map(Function.call, n =>  n * 20);
const grid_height = ROWS_NUMBER * ROW_HEIGHT;

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
    this.position = {gridLeft: 0, gridTop: 0};
  }

  renderCol({columnIndex}) {
    const is_workday = columnIndex % 7 < 5;
    return <div className={styles.col} style={{backgroundColor: colColor(is_workday)}} />
  }

  renderRow({rowIndex}) {
    const transform = `translatex(${rows[rowIndex]}px)`;
    const width = rows[rowIndex];
    return <div onClick={() => console.log('clicked')} className={styles.row} style={{transform, width}} />
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <ScrollSync>
          {({ onScroll, scrollLeft, scrollTop }) => (
            <AutoSizer>
              {({ height, width }) => (
                <div
                  ref={(node) => this.wrapper = node}
                  style={{height, width}}
                  className={styles.grid_wrapper}
                  onScroll={
                    (event) => {
                      if (this.wrapper !== event.target) return;
                      onScroll({ scrollLeft: event.target.scrollLeft, scrollTop: event.target.scrollTop })
                      this.position = {gridTop: event.target.scrollTop, gridLeft: event.target.scrollLeft};
                    }
                  }
                >
                  <div
                    style={{height: grid_height, width: grid_width}}
                    className={styles.scroller}
                    >
                    <div
                      style={{top: this.position.gridTop, left: this.position.gridLeft}}
                      className={styles.innerWrapper}
                    >
                      <Grid
                        className={styles.gridStyle}
                        rowsCount={1}
                        width={width}
                        height={height}
                        columnWidth={COL_WIDTH}
                        columnsCount={COLS}
                        rowHeight={height}
                        renderCell={this.renderCol}
                        scrollLeft={scrollLeft}
                        scrollTop={scrollTop}/>
                      <Grid
                        className={styles.gridStyle}
                        rowsCount={rows.length}
                        width={width}
                        height={height}
                        columnWidth={grid_width}
                        columnsCount={1}
                        rowHeight={ROW_HEIGHT}
                        renderCell={this.renderRow}
                        scrollLeft={scrollLeft}
                        scrollTop={scrollTop}/>
                    </div>
                  </div>
                </div>
              )}
            </AutoSizer>
          )}
        </ScrollSync>
      </div>
    );
  }
}
