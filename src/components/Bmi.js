import React, { PureComponent } from 'react';
import bmiCalculation from '../helpers/bmi_calculator';
import selectText from '../helpers/select_text';


class Bmi extends PureComponent {
  constructor(props) {
    super(props);
    let bmi_result = bmiCalculation(70, 60, 'metric');
    this.state = {
      calcultation_type: 'metric',
      bmi_result: bmi_result.bmi,
      bmi_class: bmi_result.class,
      weight_value: '70',
      height_value: '60'
    }
    this.metric_unit_map = {
      'metric': {
        'height': 'cm',
        'weight': 'kg'
      },
      'imperial': {
        'height': 'inches',
        'weight': 'lb'
      }
    }
    this.active_button_class = 'c-bmi__btn c-bmi__btn--active text-white py-2 px-4';
    this.button_class = 'c-bmi__btn c-bmi__btn--transparent bg-transparent py-2 px-4 border';

  }
  toggleMetric = (calcultation_type) => {
    this.setState({
      calcultation_type
    }, this.calculateBmi);
  }
  calculateBmi = () => {
    let bmi_result = {
      bmi: "",
      class: ""
    };
    if (this.state.weight_value !== "" && this.state.height_value !== "") {
      bmi_result = bmiCalculation(this.state.weight_value, this.state.height_value, this.state.calcultation_type);
    }
    this.setState({
      bmi_result: bmi_result.bmi,
      bmi_class: bmi_result.class
    })
  }
  onChangeInput = (key, e) => {
    this.setState({
      [key]: e.target.value
    }, this.calculateBmi)
  }
  onIncrementValue = (key, e) => {
    this.setState({
      [key]: parseInt(this.state[key]) + 1
    }, this.calculateBmi)
  }
  onDecrementValue = (key, e) => {
    if (parseInt(this.state[key]) <= 0) {
      return false;
    }
    this.setState({
      [key]: parseInt(this.state[key]) - 1
    }, this.calculateBmi)
  }
  copyText = () => {
    selectText("bmiResult");
    document.execCommand("copy");
  }
  clearAll = () => {
    this.setState({
      weight_value: "",
      height_value: "",
      bmi_result: "",
      bmi_class: ""
    })
  }
  render() {
    return (
      <div className="c-bmi mb-10">
        <h3 className="text-2xl p-2 mb-5 border-b bg-white text-black">BMI(Body Mass Index) Calculator </h3>
        <div className="mb-5">
          <button onClick={this.toggleMetric.bind(null, 'metric')} className={this.state.calcultation_type === 'metric' ? this.active_button_class : this.button_class}>
            Metric
          </button>
          <button onClick={this.toggleMetric.bind(null, 'imperial')} className={this.state.calcultation_type === 'imperial' ? this.active_button_class : this.button_class}>
            Imperial
          </button>
        </div>
        <div className="mb-5">
          <button onClick={this.clearAll} className={`b-r-10 c-bmi__btn--active text-white py-2 px-4`}>
            Clear All
          </button>
        </div>
        <div>
          <div className="mb-5">
            <div className="">
              <div className="inline-block w-1/3 c-bmi__metric-caption p-3 align-top">
                <span className="">{`Weight(${this.metric_unit_map[this.state.calcultation_type].weight})`}</span>
              </div>
              <input value={this.state.weight_value} onChange={this.onChangeInput.bind(null, 'weight_value')} className="text-green-900 inline-block w-1/2 bg-white focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block appearance-none leading-normal" type="number" placeholder="" />
              <div className="align-top inline-block c-bmi__changer">
                <button onClick={this.onIncrementValue.bind(null, 'weight_value')} className="pl-2 pr-2 c-bmi__inc" type="button">+</button>
                <button onClick={this.onDecrementValue.bind(null, 'weight_value')} className="pl-2 pr-2 c-bmi__inc" type="button">-</button>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <div className="">
              <div className="inline-block w-1/3 c-bmi__metric-caption p-3 align-top">
                <span className="">{`Height(${this.metric_unit_map[this.state.calcultation_type].height})`}</span>
              </div>
              <input value={this.state.height_value} onChange={this.onChangeInput.bind(null, 'height_value')} className="text-green-900 inline-block w-1/2 bg-white focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block appearance-none leading-normal" type="number" placeholder="" />
              <div className="align-top inline-block c-bmi__changer">
                <button onClick={this.onIncrementValue.bind(null, 'height_value')} className="pl-2 pr-2 c-bmi__inc" type="button">+</button>
                <button onClick={this.onDecrementValue.bind(null, 'height_value')} className="pl-2 pr-2 c-bmi__inc" type="button">-</button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="">
              <div className="inline-block w-1/3 c-bmi__metric-caption p-3 align-top">
                <span className="">BMI Result</span>
              </div>
              <div id="bmiResult" className="c-bmi__result text-green-900 inline-block w-1/2 bg-white focus:outline-none focus:shadow-outline border border-gray-300 py-2">{this.state.bmi_result}</div>
              <div onClick={this.copyText} className="align-top inline-block c-bmi__copy">
                <img className="pl-2 pr-2" src="/copy.png" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <img className={`${this.state.bmi_class === 'under' ? 'active' : ''} inline-block w-1/5 opacity-50 c-bmi__class md:w-2/12`} src="/BMI-Underweight.png" />
          <img className={`${this.state.bmi_class === 'normal' ? 'active' : ''} inline-block w-1/5 opacity-50 c-bmi__class md:w-2/12`} src="/BMI-Normal.png" />
          <img className={`${this.state.bmi_class === 'over' ? 'active' : ''} inline-block w-1/5 opacity-50 c-bmi__class md:w-2/12`} src="/BMI-Overweight.png" />
          <img className={`${this.state.bmi_class === 'obese' ? 'active' : ''} inline-block w-1/5 opacity-50 c-bmi__class md:w-2/12`} src="/BMI-Obese.png" />
        </div>
      </div>
    )
  }
}

export default Bmi;
