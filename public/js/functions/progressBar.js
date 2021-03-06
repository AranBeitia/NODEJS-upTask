import Swal from 'sweetalert2'

export const updateProgress = () => {
	// select existing tasks
	const tasks = document.querySelectorAll('li.tarea')

	if (tasks.length) {
		// select completed tasks
		const completedTasks = document.querySelectorAll('i.completo')

		// calculate progress
		const progress = Math.round((completedTasks.length / tasks.length) * 100)

		// show progress
		const percentage = document.querySelector('#porcentaje')
		percentage.style.width = `${progress}%`

		if (progress === 100) {
			Swal.fire(
				'Project completed',
				'Congratulations, you finished all the tasks!',
				'success'
			)
		}
	}
}
