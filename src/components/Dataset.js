import React, { Component } from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import _ from 'lodash'

const styles = {
  block: {
    maxWidth: 2,
    display: 'flex',
    flexDirection: 'row'
  },
  checkbox: {
    // marginBottom: 16
  }
}

class Dataset extends Component {
  constructor (props) {
    super(props)

    const ratings = []
    for (let yearI = 10; yearI >= 0; yearI--) {
      ratings.push(yearI)
    }

    const years = []
    for (let yearI = new Date().getFullYear(); yearI >= 2000; yearI--) {
      years.push(yearI)
    }
    years.push(0)

    this.state = {
      years,
      ratings,
      yearsClicked: [],
      ratingsClicked: []
    }
  }

  render () {
    console.log('years Clicked', this.state.yearsClicked)
    console.log('ratings Clicked', this.state.ratingsClicked)
    return (
      <div>
        <h3>Filters</h3>
        <div style={styles.block}>
          <h4>Year</h4>
          <RadioButtonGroup name="YearsClicked" style={styles.block} onChange={(e) => this.addClicks(e, 'year')}>
            {this.state.years.map(year => {
              return (
                <RadioButton
                  value={year}
                  label={year}
                />
              )
            })
            }
          </RadioButtonGroup>
        </div>
        <div style={styles.block}>
          <h4>Ratings</h4>
          <RadioButtonGroup name="RatingsClicked" style={styles.block} onChange={(e) => this.addClicks(e, 'rating')}>
            {this.state.ratings.map(rating => {
              return (
                <RadioButton
                  value={rating}
                  label={rating}
                />
              )
            })
            }
          </RadioButtonGroup>
        </div>
      </div>
    )
  }

  addClicks (event, label) {
    console.log(label, event.target.id, event.target.checked, event.target.value)

    if (label === 'year') {
      this.props.callbackParent(event.target.value,null)
    }

    if (label === 'rating') {
      this.props.callbackParent(null,event.target.value)
    }
  }
}

Dataset.propTypes = {}
Dataset.defaultProps = {}

export default Dataset
