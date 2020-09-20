# SIFAP

## Documentación

### CSS
   Para el estilado de la aplicación estamos usando el preprocesador Sass:
   Profundidad maxima de anidación: 3

   Nomenclatura de carpetas: name
   Nomenclatura de archivos: Name.scss / NameName.scss
   Nomenclatura de variables: --name-name: value;
      - Variables nativas de css
   Nomenclatura de mixin, placeholder: @mixin/%placeholder name-lastname {}

   Metodología: BEM, Bloque sera en capitalize Ej: Bloque__elemento--modificador

   Selectores: Todos menos ID, no usar !important

   Los archivos **utils** Var.scss y Reset.scss y Las fuentes los importamos al archivo App.scss y este los importamos a App.jsx, de esta manera tenemos acceso a estas utilerías, ya que cada archivo.scss que corresponda a un componente en React sera importado en el.
   Mixin y Placeholder, se importaran en cada archivo que los necesite

   - Hover para anclas '<a></a>' #049ECA
   - Color cuando se seleciona algún item #007EA3

   ### Estructura
      - styles/
         - componentes/
            Header.scss
         - utils/
            Mixin.scss
            Placeholder.scss
            Reset.scss
            Var.scss
         App.scss