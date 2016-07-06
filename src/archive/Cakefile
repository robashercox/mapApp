exec = require('child_process').exec
fs = require('fs')

Array::remove = (e) -> @[t..t] = [] if (t = @indexOf(e)) > -1
Array::include = (e) -> @indexOf(e) > -1

config =
  # All files are compiled in the order you like into following ".js" file.
  output: 'public/javascripts/app.js'

  # You can define the order of the files here.
  # Files located in directories you specify here, but not already in the files array, will be included too.
  # 
  # This example adds all ".coffee" files in "app" and it's subdirectories, except for "app/models/todo.coffee", because it already here.
  files:  ['app/models/todo.coffee', 'app']

  _files: (dir) ->
    unless dir?
      while (config._files(file) for file in @files when fs.lstatSync(file).isDirectory()).length > 0 then
      file for file in @files when file.match(/\.coffee$/)
    else
      @files.remove(dir)
      @files.push(file) for file in fs.readdirSync(dir) when (file = "#{dir}/#{file}") and not @files.include(file)


task 'watch', "Watch and compile into #{config.output}", ->
  files = config._files().join(' ')
  exec("coffee -j #{config.output} -cw #{files}").stdout.on 'data', (data) ->
    process.stdout.write(data)