import selectConstructor from './selectConstructor'
const options = ['second(s)', 'minute(s)', 'hour(s)', 'day(s)', 'week(s)', 'month(s)', 'year(s)']

module.exports = function renderTimeAgoField(topic, parameterizedPlural) {
  let absoluteTime = ''
  switch (topic.topic_type) {
    case 'test':
      absoluteTime = 'test_date'
      break;
    case 'hospitalization':
      absoluteTime = 'admission_date'
      break;
    default:
      absoluteTime = 'absolute_start_date'
  }
  const returnStatement = `<input type="checkbox" class="time_ago_toggle" id="time_ago_${topic.id}_toggle" checked>
  <br />
  <div class="approximate">
    <div class='input-group'>
      <input type='number' name='visit[${parameterizedPlural}_attributes][${topic.id}][time_ago_amount]' id='visit_${parameterizedPlural}_attributes_${topic.id}_time_ago_amount' class='form-control calculator' placeholder='time ago'>
      <span class='input-group-btn'>
        <button class='btn btn-primary calculator' type='button' id='${parameterizedPlural}_${topic.id}_time_calc_button'><i class='fa fa-calculator'></i></button>
      </span>
      <select name='visit[${parameterizedPlural}_attributes][${topic.id}][time_ago_scale]' id='visit_${parameterizedPlural}_attributes_${topic.id}_time_ago_scale' class='form-control'>
        ${selectConstructor(options, 'time ago')}
      </select>
    </div>
  </div>
  <div class="exact" style="display: none">
    <input type='date' name='visit[${parameterizedPlural}_attributes][${topic.id}][${absoluteTime}]' id='visit_${parameterizedPlural}_attributes_${topic.id}_${absoluteTime}' class='form-control'>
  </div>`;
  return returnStatement;
}
