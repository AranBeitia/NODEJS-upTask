const { Result } = require('express-validator')
const Projects = require('../models/Projects')

exports.home = async (request, response) => {
	const projects = await Projects.findAll()

	response.render('index', {
		pageName: 'Projects ' + response.locals.year,
		projects,
	})
}

exports.projectForm = async (request, response) => {
	const projects = await Projects.findAll()
	response.render('newProject', {
		pageName: 'New Project',
		projects,
	})
}

exports.newProject = async (request, response) => {
	const projects = await Projects.findAll()
	// validar que tengamos algo en el input
	const { name } = request.body

	let errors = []

	if (!name) {
		errors.push({ texto: 'agregar un nombre al proyecto' })
	}

	// si hay errores
	if (errors.length > 0) {
		response.render('newProject', {
			pageName: 'New Project',
			errors,
			projects,
		})
	} else {
		// no hay errores
		// insertar en la BD.
		const project = await Projects.create({ name })
		response.redirect('/')
	}
}

exports.projectByUrl = async (request, response) => {
	const projects = await Projects.findAll()
	const project = await Projects.findOne({
		where: {
			url: request.params.url,
		},
	})

	if (!project) return next()

	response.render('tasks', {
		pageName: "Project's tasks",
		project,
		projects,
	})
}
