import './DatabaseBuilder'

import './Commands/Migrate/CurrentVersionCommand'
import './Commands/Migrate/LatestCommand'
import './Commands/Migrate/RollbackCommand'
import './Commands/Migrate/MakeCommand'

import { RunCommand as SeedRunCommand } from './Commands/Seed/RunCommand'
import { MakeCommand as SeedMakeCommand } from './Commands/Seed/MakeCommand'

export function DatabaseProvider(app, databaseBuilder = null, configBuilder = null) {
	databaseBuilder = databaseBuilder || DatabaseBuilder
	app.db = databaseBuilder(app.config.get('database.default'), app, configBuilder)

	if(app.cli.isNil) {
		return
	}

	app.cli.register([
		CurrentVersionCommand,
		LatestCommand,
		RollbackCommand,
		MakeCommand,

		SeedRunCommand,
		SeedMakeCommand
	])
}

DatabaseProvider.shutdown = app => app.db.destroy()
DatabaseProvider.priority = 50000
