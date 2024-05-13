

watch:
	sass --watch --sourcemap=none --style=expanded scss/style.scss:css/style.css

build:
	sass --sourcemap=none --style=expanded scss/style.scss:css/style.css

compressed:
	sass --sourcemap=none --style=compressed scss/style.scss:css/style.css
