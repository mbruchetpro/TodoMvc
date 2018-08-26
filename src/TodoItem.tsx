import * as React from 'react'
import { render } from 'react-dom'
import { Todo } from './Interfaces'
import * as cx from 'classnames'

interface Props {
  todo: Todo
  onToggle: (todo: Todo) => void
  onDestroy: (todo: Todo) => void
  onUpdate: (todo: Todo, title: string) => void
}

interface State {
  editing: boolean
  title: string
}
/**
 * Classe permettant d'obtenir un objet todo.
 */
export default class TodoItem extends React.PureComponent<Props,State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      editing: false,
      title: ''
    }
  }

  render () {
    let { todo } = this.props
    let { editing, title } = this.state

    return <li data-id='1531604596928' className={cx({ completed: todo.completed, editing })}>
        <div className='view'>
            <input className='toggle' type='checkbox' onChange={this.toggle} checked={todo.completed}/>
            <label onDoubleClick={this.startEditing}>{todo.title}</label>
            <button className='destroy' onClick={this.destroy}/>
        </div>
        <input
              className='edit'
              value={title}
              onBlur={this.handleSubmit}
              onKeyDown={this.handleKeyDown}
              onInput={this.handleInput}
              type='text'
        />
    </li>
  }

  toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onToggle(this.props.todo)
  }

  destroy = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onDestroy(this.props.todo)
  }

  startEditing = (e: React.MouseEvent<HTMLLabelElement>) => {
    this.setState({ editing: true, title: this.props.todo.title })
  }

  handleSubmit = () => {
    this.props.onUpdate(this.props.todo, this.state.title)
    this.setState({ editing: false })
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      this.setState({ editing: false })
    } else if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ title: (e.target as HTMLInputElement).value })
  }
}
