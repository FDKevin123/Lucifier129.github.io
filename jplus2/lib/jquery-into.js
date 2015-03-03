/**
 * turn.js
 */
;(function(win) {

	function int(obj) {
		return parseInt(obj, 10)
	}

	var status = {
		into: {
			addClass: ['slide', 'in'],
			removeClass: ['out', 'reverse']
		},
		out: {
			addClass: ['out'],
			removeClass: ['in', 'reverse']
		}
	}

	$.pageStatus = status

	function setStatus($elem, type, otherClass) {
		$.each(status[type] || {}, function(method, classList) {
			var classNames = classList.join(' ')
			$elem[method](classNames)
		})
		$elem.addClass(otherClass)
	}

	var count = 0

	function into(parent) {
		var index = this.attr('data-turn-index')
		if (typeof index === 'undefined') {
			index = count++
			this.attr('data-turn-index', index)
		} else {
			index = int(index)
		}

		animationEnd($(parent).append(this.show())[0])

		var $cur = this.siblings('.in')
		var curIndex = int($cur.attr('data-turn-index')) || -1
		var reverse = index > curIndex ? null : 'reverse'
		setStatus(this, 'into', reverse)
		setStatus($cur, 'out', reverse)
	}

	function animationEnd(elem) {
		if (!elem || $(elem).data('amimation')) {
			return
		}
		elem.addEventListener('amimationEnd', hide, false)
		elem.addEventListener('webkitAnimationEnd', hide, false)
		$(elem).data('amimation', true)
	}

	function hide(e) {
		var $target = $(e.target)
		if ($target.hasClass('out')) {
			$target.hide()
		}
	}

	$.fn.into = function(parent) {
		return this.each(function() {
			into.call($(this), parent)
		})
	}

}(window))