// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "none",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },

    // call this function on every dragmove event
    onmove: function (event) {
      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    },
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });
  
  /* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */

 var num_array = [0,0,0,0,0,0,0,0,0,0,0,0,0];
 var muscle_array = ["abs","biceps","calfs","delts","glutes","lats","obliques","pecs","quads","traps","tris", "biggest", "dom"];
 var success = false;
 
// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '#yes-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
	
//    draggableElement.textContent = 'Dragged in';
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
	
	var foo = event.relatedTarget.className;	//moved and modified from ondrop
	var class_array = foo.split(" ");
	for (i=0; i < class_array.length; i++) {
		for (j=0; j < num_array.length; j++) {
			if ((document.getElementById(class_array[i]) == document.getElementById(muscle_array[j])) && num_array[j] > 0) {
				num_array[j] -= 1;
				update_skeleton();
			}
		}
	}
//    event.relatedTarget.textContent = 'Dragged out';
  },
  ondrop: function (event) {
//    event.relatedTarget.textContent = 'Dropped';
var foo = event.relatedTarget.className;	//moved from ondrop
	var class_array = foo.split(" ");
	for (i=0; i < class_array.length; i++) {
		for (j=0; j < num_array.length; j++) {
			if (document.getElementById(class_array[i]) == document.getElementById(muscle_array[j])) {
				num_array[j] += 1;
				update_skeleton();
			}
		}
	}

  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});

function update_skeleton() {
	for (k=0; k < num_array.length; k++) {
		if (num_array[k] >=1)
			document.getElementById(muscle_array[k]).style.visibility="visible";
		else 
			document.getElementById(muscle_array[k]).style.visibility="hidden";
	}
}