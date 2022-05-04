import { useRef, useEffect, useState } from "react"

const Shimmer = ({ children, isLoading, component: Component, exampleProps, defaultStyles = {}, className }) => {
    const fakeComponentRef = useRef(null)

    const [show, setShow] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{
            setShow(true)
        },1)
    })
    
    const texts = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong']
    const contents = ['img', 'video', 'button', 'input', 'textarea', 'select']

    const styleProps = ['borderRadius', 'padding', 'margin', 'marginRight', 'marginLeft', 'marginTop', 'marginBottom', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'display', 'alignItems', 'justifyContent', 'flexDirection', 'gridTemplateColumns', 'gridTemplateRows', 'gridGap', 'columnGap', 'rowGap', 'gap', 'gridTemplateAreas' ]

    const renderElement = (element) => {
        console.log('renderElement', document.defaultView.getComputedStyle(element, null))

        const object = {}
        styleProps.forEach(s => Object.assign(object, {[s]: element.style[s]}))

        if(texts.includes(element.localName)){
            const fontSize = +document.defaultView.getComputedStyle(element, null)["fontSize"].replace('px','')
            const lineHeight = +document.defaultView.getComputedStyle(element, null)["lineHeight"].replace('px','') | fontSize * 1.2
            const numberOfLines = Math.round(element.offsetHeight / lineHeight)
            const lineMarginBottom = lineHeight - fontSize

            const lines = []

            for(let i=0; i<numberOfLines; i++){
                lines.push(i)
            }

            return(
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {lines.map(line => (
                        <div 
                        style={{
                            width: element.offsetWidth,
                            ...object,
                            ...defaultStyles,
                            height: fontSize,
                            marginBottom: lineMarginBottom
                        }}
                        className={`shimmer ${className}`}
                        key={"line"+line}
                    />))
                    }
                </div>  
            )
        }

        if(contents.includes(element.localName)){
            return (
                <div 
                    style={{
                        width: element.offsetWidth,
                        height: element.offsetHeight,
                        ...object,
                        ...defaultStyles
                    }}
                    className={`shimmer ${className}`}
                />
            )
        }

        return (
            <div 
                style={{
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                    display: element.style.display,
                    alignItems: element.style.alignItems,
                    justifyContent: element.style.justifyContent,
                    flexDirection: element.style.flexDirection,
                    padding: element.style.padding,
                    margin: element.style.margin,
                    marginBottom: element.style.marginBottom,
                    marginTop: element.style.marginTop,
                    marginLeft: element.style.marginLeft,
                    marginRight: element.style.marginRight,
                    paddingTop: element.style.paddingTop,
                    paddingBottom: element.style.paddingBottom,
                    paddingLeft: element.style.paddingLeft,
                    paddingRight: element.style.paddingRight
                }}
            >
                {!!element.children 
                    ? [...element.children]
                        .map(child => renderElement(child))
                    : null
                } 
            </div>
        )
    }

    /*return isLoading ? (
        <>
        <div style={{visibility: 'hidden', position: 'absolute'}} ref={fakeComponentRef}>
        <Component {...exampleProps}/>
        </div>
        {show && renderElement(fakeComponentRef.current)}
        </>
    ) : children*/

    return (
        <>
            <div style={isLoading ? {visibility: 'hidden', position: 'absolute'} : {}} ref={fakeComponentRef}>
                {{...children, props: isLoading ? exampleProps : children.props}}
            </div>
            {show && isLoading && renderElement(fakeComponentRef.current)}
        </>
    )
}

export default Shimmer