import Context1 from '../context1'
import Context2 from '../context2'
import style from './contextDemo.module.css'
export default function ContextDemo () {
  return (
    <div id={style.contextDemo}>
      <Context1 style={style} />
      <Context2 style={style} />
    </div>
  )
}
