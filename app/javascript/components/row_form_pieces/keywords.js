module.exports = function keywords(topic, parameterizedPlural) {
  let returnStatement = ``
  if (topic.descriptors) {
    returnStatement += `<div class='form-inline descriptors'>`
    for (var i = 0; i < topic.descriptors.length; i++) {
      returnStatement += `
          <label class='form-check-label descriptor'>
            <input class='form-check-input' type='checkbox' name='visit[${parameterizedPlural}_attributes][${topic.id}][descriptors][]' id='visit_${parameterizedPlural}_attributes_${topic.id}_descriptors_${topic.descriptors[i]}' value='${topic.descriptors[i]}'>
            ${topic.descriptors[i]}
          </label>
      `
    }
    returnStatement += '</div>'
  }
  return returnStatement;
}
