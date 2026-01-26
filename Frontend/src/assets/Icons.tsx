import type { IconType } from "../types/icon.type"

export const Undo = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M318.08-220q-12.77 0-21.39-8.62-8.61-8.61-8.61-21.38t8.61-21.38q8.62-8.62 21.39-8.62h257.07q62.62 0 107.77-41.35 45.16-41.34 45.16-102.11 0-60.77-45.16-101.93-45.15-41.15-107.77-41.15H294.31l90.23 90.23q8.69 8.7 8.69 21.08 0 12.38-8.69 21.08-8.69 8.69-21.27 8.5-12.58-.2-20.88-8.5L205.31-571.23q-5.62-5.62-7.92-11.85-2.31-6.23-2.31-13.46t2.31-13.46q2.3-6.23 7.92-11.85l137.08-137.07q8.69-8.69 21.07-8.69 12.39 0 21.08 8.69 8.69 8.69 8.5 21.27-.19 12.57-8.5 20.88l-90.23 90.23h280.84q87.77 0 150.35 58.58t62.58 144.5q0 85.92-62.58 144.69Q662.92-220 575.15-220H318.08Z"/></svg>
  )
}

export const Redo = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M665.69-566.54H384.85q-62.62 0-107.77 41.15-45.16 41.16-45.16 101.93 0 60.77 45.16 102.11Q322.23-280 384.85-280h257.07q12.77 0 21.39 8.62 8.61 8.61 8.61 21.38t-8.61 21.38q-8.62 8.62-21.39 8.62H384.85q-87.77 0-150.35-58.77t-62.58-144.69q0-85.92 62.58-144.5t150.35-58.58h280.84l-90.23-90.23q-8.31-8.31-8.5-20.88-.19-12.58 8.5-21.27t21.08-8.69q12.38 0 21.07 8.69l137.08 137.07q5.62 5.62 7.92 11.85 2.31 6.23 2.31 13.46t-2.31 13.46q-2.3 6.23-7.92 11.85L617.61-434.15q-8.3 8.3-20.88 8.5-12.58.19-21.27-8.5-8.69-8.7-8.69-21.08 0-12.38 8.69-21.08l90.23-90.23Z"/></svg>
  )
}

export const Bold = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M342.62-222q-14.32 0-23.93-9.61t-9.61-23.93v-448.92q0-14.32 9.61-23.93t23.93-9.61H484q59.16 0 104.58 37.48T634-602.77q0 38.69-19.81 68.73-19.81 30.04-49.81 44.62 37.54 11.19 62.54 44.88 25 33.69 25 79.85 0 66.38-50.16 104.54Q551.6-222 492-222H342.62Zm23.46-53.38h123.14q46.78 0 74.86-27.97 28.07-27.96 28.07-65.11 0-37.16-28.57-65.12-28.58-27.96-75.73-27.96H366.08v186.16Zm0-236.62h114.54q39.92 0 68.11-25.19 28.19-25.19 28.19-61.35 0-37.84-28.26-62.08-28.26-24.23-66.97-24.23H366.08V-512Z"/></svg>
  )
}

export const Italic = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M267.85-222q-8.53 0-14.42-5.88-5.89-5.87-5.89-14.38 0-8.51 5.89-14.43 5.89-5.93 14.42-5.93h125.07l143.23-434.76H407.08q-8.53 0-14.42-5.88-5.89-5.88-5.89-14.38 0-8.51 5.89-14.44 5.89-5.92 14.42-5.92h299.69q8.53 0 14.42 5.88 5.89 5.87 5.89 14.38 0 8.51-5.89 14.43-5.89 5.93-14.42 5.93H578.31L435.08-262.62h132.46q8.53 0 14.42 5.88 5.89 5.88 5.89 14.38 0 8.51-5.89 14.44-5.89 5.92-14.42 5.92H267.85Z"/></svg>
  )
}

export const Underline = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M247.69-190q-8.5 0-14.25-5.76t-5.75-14.27q0-8.51 5.75-14.24t14.25-5.73h464.62q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T712.31-190H247.69ZM480-317.69q-85.62 0-134.31-50.31T297-504.62v-279.76q0-9.29 6.84-15.91 6.85-6.63 16.12-6.63 9.27 0 15.81 6.63 6.54 6.62 6.54 15.91v281.15q0 65.23 36.46 103.31 36.46 38.07 101.23 38.07 64.77 0 101.23-38.07 36.46-38.08 36.46-103.31v-281.15q0-9.29 6.85-15.91 6.84-6.63 16.11-6.63t15.81 6.63q6.54 6.62 6.54 15.91v279.76q0 86.31-48.69 136.62T480-317.69Z"/></svg>
  )
}

export const Strikethrough = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M140-420.77q-8.5 0-14.25-5.76-5.75-5.75-5.75-14.27 0-8.51 5.75-14.24t14.25-5.73h680q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T820-420.77H140Zm315.38-118.46V-710h-190q-10.25 0-17.43-7.21-7.18-7.2-7.18-17.5 0-10.29 7.18-17.79t17.43-7.5h430q10.26 0 17.44 7.21 7.18 7.2 7.18 17.5 0 10.29-7.18 17.79t-17.44 7.5h-190v170.77h-50Zm0 196.92h50v117.69q0 10.26-7.2 17.44-7.21 7.18-17.5 7.18-10.3 0-17.8-7.4-7.5-7.41-7.5-17.98v-116.93Z"/></svg>
  )
}

export const Highlighter = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M120 0q-16.08 0-28.04-11.58Q80-23.15 80-40q0-16.08 11.96-28.04T120-80h720q16.08 0 28.04 11.58Q880-56.85 880-40q0 16.08-11.96 28.04T840 0H120Zm440.15-468.46-104-104-155.38 155.38q-6.92 6.93-6.92 16.93t6.92 16.92l69.92 70.15q6.93 6.93 16.93 6.93t16.92-6.93l155.61-155.38Zm-75.46-132.31L588.46-497 770-678.31q6.92-6.92 6.92-17.69 0-10.77-6.92-17.69l-68.62-68.62q-6.92-6.92-17.69-6.92-10.77 0-17.69 6.92L484.69-600.77Zm-42.46-14.38 160.62 160.61-169.77 170q-19.39 19.39-45.35 19.39t-45.35-19.39l-7.69-7.69-27.31 27.08q-8.69 8.23-20.53 13.23-11.85 5-24.31 5h-45.85q-10.92 0-14.88-10.08-3.96-10.08 3.73-17.77l73.54-73.31-6.16-6.15q-19.38-19.39-19.61-45.58-.23-26.19 19.15-45.57l169.77-169.77Zm0 0 196.23-196.23q19.39-19.39 45.35-19.39t45.34 19.39l70.16 69.92q19.38 19.38 19.38 45.34 0 25.97-19.38 45.35L602.85-454.54 442.23-615.15Z"/></svg>
  )
}

export const Link = ({dimension = 24, color='#000000'}: IconType) => {
  return  (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M283.08-316.92q-67.68 0-115.38-47.69Q120-412.3 120-479.96t47.7-115.39q47.7-47.73 115.38-47.73h121.54q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24t-14.25 5.73H282.99q-50.68 0-86.84 36.16Q160-530.77 160-480t36.15 86.92q36.16 36.16 86.84 36.16h121.63q8.5 0 14.25 5.75 5.75 5.76 5.75 14.27 0 8.52-5.75 14.25t-14.25 5.73H283.08ZM360-460q-8.5 0-14.25-5.76T340-480.03q0-8.51 5.75-14.24T360-500h240q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T600-460H360Zm195.38 143.08q-8.5 0-14.25-5.76t-5.75-14.27q0-8.51 5.75-14.24t14.25-5.73h121.63q50.68 0 86.84-36.16Q800-429.23 800-480t-36.15-86.92q-36.16-36.16-86.84-36.16H555.38q-8.5 0-14.25-5.75-5.75-5.76-5.75-14.27 0-8.52 5.75-14.25t14.25-5.73h121.54q67.68 0 115.38 47.69Q840-547.7 840-480.04t-47.7 115.39q-47.7 47.73-115.38 47.73H555.38Z"/></svg>
  )
}

export const ArrowDown = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><path d="M19.92 8.9502L13.4 15.4702C12.63 16.2402 11.37 16.2402 10.6 15.4702L4.07996 8.9502" stroke={color} strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )
}

export const Superscript = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M767.69-600q-13.73 0-23.02-9.29t-9.29-23.02v-30.77q0-13.73 9.29-23.02 9.29-9.28 23.02-9.28H840v-33.85h-89.23q-6.15 0-10.77-4.62-4.62-4.61-4.62-10.77 0-6.15 4.62-10.76 4.62-4.62 10.77-4.62h87.69q13.73 0 23.02 9.29t9.29 23.02v30.77q0 13.73-9.29 23.02-9.29 9.28-23.02 9.28h-72.31v33.85h89.23q6.16 0 10.77 4.62 4.62 4.61 4.62 10.77 0 6.15-4.62 10.76-4.61 4.62-10.77 4.62h-87.69ZM320.33-200q-13.15 0-19.24-11.08-6.09-11.07.99-22.54l145.61-225.07L315.85-662q-7.08-11.23-.99-22.31 6.09-11.07 18.76-11.07 5.84 0 10.52 2.67 4.67 2.68 7.48 7.56l127.15 197.46h.92l129.23-198.23q2.76-4.51 7.57-6.99 4.82-2.47 10.22-2.47 13.27 0 19.16 11.07 5.9 11.08-1.18 22.54L510.54-458.69l147.38 225.07q7.08 11.47.81 22.54Q652.46-200 639.92-200q-5.68 0-10.42-2.68-4.73-2.68-7.58-7.55L479.69-428.54h-.92L338.08-210.23q-2.76 4.87-7.57 7.55-4.82 2.68-10.18 2.68Z"/></svg>
  )
}

export const Subscript = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M767.69-200q-13.73 0-23.02-9.29t-9.29-23.02v-30.77q0-13.73 9.29-23.02 9.29-9.28 23.02-9.28H840v-33.85h-89.23q-6.15 0-10.77-4.62-4.62-4.61-4.62-10.77 0-6.15 4.62-10.76 4.62-4.62 10.77-4.62h87.69q13.73 0 23.02 9.29t9.29 23.02v30.77q0 13.73-9.29 23.02-9.29 9.28-23.02 9.28h-72.31v33.85h89.23q6.16 0 10.77 4.62 4.62 4.61 4.62 10.77 0 6.15-4.62 10.76-4.61 4.62-10.77 4.62h-87.69Zm-447.36-64.62q-13.15 0-19.24-11.07-6.09-11.08.99-22.54l145.61-225.08-131.84-203.31q-7.08-11.23-.99-22.3Q320.95-760 333.62-760q5.84 0 10.52 2.68 4.67 2.68 7.48 7.55l127.15 197.46h.92l129.23-198.23q2.76-4.5 7.57-6.98 4.82-2.48 10.22-2.48 13.27 0 19.16 11.08 5.9 11.07-1.18 22.54L510.54-523.31l147.38 225.08q7.08 11.46.81 22.54-6.27 11.07-18.81 11.07-5.68 0-10.42-2.67-4.73-2.68-7.58-7.56l-142.23-218.3h-.92l-140.69 218.3q-2.76 4.88-7.57 7.56-4.82 2.67-10.18 2.67Z"/></svg>
  )
}

export const AlignLeft = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M180-160q-8.5 0-14.25-5.76T160-180.03q0-8.51 5.75-14.24T180-200h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-160H180Zm0-150q-8.5 0-14.25-5.76T160-330.03q0-8.51 5.75-14.24T180-350h360q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T540-310H180Zm0-150q-8.5 0-14.25-5.76T160-480.03q0-8.51 5.75-14.24T180-500h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-460H180Zm0-150q-8.5 0-14.25-5.76T160-630.03q0-8.51 5.75-14.24T180-650h360q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T540-610H180Zm0-150q-8.5 0-14.25-5.76T160-780.03q0-8.51 5.75-14.24T180-800h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-760H180Z"/></svg>
  )
}

export const AlignCenter = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M180-160q-8.5 0-14.25-5.76T160-180.03q0-8.51 5.75-14.24T180-200h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-160H180Zm160-150q-8.5 0-14.25-5.76T320-330.03q0-8.51 5.75-14.24T340-350h280q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T620-310H340ZM180-460q-8.5 0-14.25-5.76T160-480.03q0-8.51 5.75-14.24T180-500h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-460H180Zm160-150q-8.5 0-14.25-5.76T320-630.03q0-8.51 5.75-14.24T340-650h280q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T620-610H340ZM180-760q-8.5 0-14.25-5.76T160-780.03q0-8.51 5.75-14.24T180-800h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-760H180Z"/></svg>
  )
}

export const AlignRight = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M180-760q-8.5 0-14.25-5.76T160-780.03q0-8.51 5.75-14.24T180-800h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-760H180Zm240 150q-8.5 0-14.25-5.76T400-630.03q0-8.51 5.75-14.24T420-650h360q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-610H420ZM180-460q-8.5 0-14.25-5.76T160-480.03q0-8.51 5.75-14.24T180-500h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-460H180Zm240 150q-8.5 0-14.25-5.76T400-330.03q0-8.51 5.75-14.24T420-350h360q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-310H420ZM180-160q-8.5 0-14.25-5.76T160-180.03q0-8.51 5.75-14.24T180-200h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-160H180Z"/></svg>
  )
}

export const AlignJustify = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="M180-160q-8.5 0-14.25-5.76T160-180.03q0-8.51 5.75-14.24T180-200h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-160H180Zm0-150q-8.5 0-14.25-5.76T160-330.03q0-8.51 5.75-14.24T180-350h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-310H180Zm0-150q-8.5 0-14.25-5.76T160-480.03q0-8.51 5.75-14.24T180-500h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-460H180Zm0-150q-8.5 0-14.25-5.76T160-630.03q0-8.51 5.75-14.24T180-650h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-610H180Zm0-150q-8.5 0-14.25-5.76T160-780.03q0-8.51 5.75-14.24T180-800h600q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-760H180Z"/></svg>
  )
}

export const Code = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill="#000000"><path d="m324.54-480 72.84-72.85q5.85-5.84 6.24-13.77.38-7.92-6.24-14.53-6.61-6.62-14.26-6.62-7.66 0-14.27 6.62l-78.54 78.53q-5.23 5.24-7.35 10.7-2.11 5.46-2.11 11.92t2.11 11.92q2.12 5.46 7.35 10.7l79.31 79.3q5.84 5.85 13.88 6.23 8.04.39 14.65-6.23 6.62-6.61 6.62-14.15t-6.62-14.15L324.54-480Zm310.92 0-73.61 73.62q-5.85 5.84-6.23 13.76-.39 7.93 6.23 14.54 6.61 6.62 14.27 6.62 7.65 0 14.26-6.62l79.31-79.3q5.23-5.24 7.35-10.7 2.11-5.46 2.11-11.92t-2.11-11.92q-2.12-5.46-7.35-10.7l-79.31-79.3q-2.92-2.93-6.57-4.39-3.66-1.46-7.31-1.46-3.65 0-7.69 1.46-4.04 1.46-6.96 4.39-6.62 6.61-6.62 14.15t6.62 14.15L635.46-480ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"/></svg>
  )
}

export const Pin = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M640-760v280l68 68q6 6 9 13.5t3 15.5v23q0 17-11.5 28.5T680-320H520v234q0 17-11.5 28.5T480-46q-17 0-28.5-11.5T440-86v-234H280q-17 0-28.5-11.5T240-360v-23q0-8 3-15.5t9-13.5l68-68v-280q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760ZM354-400h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg>

  )
}

export const Delete = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><g clipPath="url(#clip0_4418_6145)"><path d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path opacity="0.5" d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M18.8499 9.14062L18.1999 19.2106C18.0899 20.7806 17.9999 22.0006 15.2099 22.0006H8.7899C5.9999 22.0006 5.9099 20.7806 5.7999 19.2106L5.1499 9.14062" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path opacity="0.5" d="M10.3301 16.5H13.6601" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path opacity="0.5" d="M9.5 12.5H14.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></g><defs><clipPath id="clip0_4418_6145"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
  )
}

export const Edit = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><g clipPath="url(#clip0_4418_6050)"><path opacity="0.5" d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16.0399 3.01928L8.15988 10.8993C7.85988 11.1993 7.55988 11.7893 7.49988 12.2193L7.06988 15.2293C6.90988 16.3193 7.67988 17.0793 8.76988 16.9293L11.7799 16.4993C12.1999 16.4393 12.7899 16.1393 13.0999 15.8393L20.9799 7.95928C22.3399 6.59928 22.9799 5.01928 20.9799 3.01928C18.9799 1.01928 17.3999 1.65928 16.0399 3.01928Z" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /><path opacity="0.5" d="M14.9102 4.15039C15.5802 6.54039 17.4502 8.41039 19.8502 9.09039" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></g><defs><clipPath id="clip0_4418_6050"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
  )
}

export const Tick = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="m400-401.77 242.92-243.31q8.28-8.3 21.06-8.3 12.79 0 21.1 8.28 8.3 8.28 8.3 21.07 0 12.8-8.3 21.11L425.31-343.54q-10.85 10.85-25.31 10.85-14.46 0-25.31-10.85l-99.77-99.38q-8.3-8.28-8.3-21.06 0-12.79 8.28-21.1 8.28-8.3 21.07-8.3 12.8 0 21.11 8.3L400-401.77Z"/></svg>
  )
}

export const Blockquote = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="m280.46-297.69 78.77-136.93q-6.92 3.85-16.15 5.39-9.23 1.54-18.46 1.54-56 0-94.16-38.87-38.15-38.86-38.15-93.44 0-56 38.15-94.15 38.16-38.16 94.16-38.16 54.57 0 93.44 38.16 38.86 38.15 38.86 93.88 0 19.42-4.73 36.23-4.73 16.81-13.42 31.73L314.85-277.69q-2.51 4.5-7.01 7.25-4.51 2.75-10.02 2.75-11.51 0-17.24-10-5.73-10-.12-20Zm350.77 0L710-434.62q-6.92 3.85-16.15 5.39-9.23 1.54-18.47 1.54-56 0-94.15-38.87-38.15-38.86-38.15-93.44 0-56.77 38.15-94.54t94.15-37.77q54.58 0 93.45 38.16 38.86 38.15 38.86 93.88 0 19.42-4.73 36.23-4.73 16.81-13.42 31.73L665.62-277.69q-2.51 4.5-7.01 7.25-4.51 2.75-10.02 2.75-11.51 0-17.24-10-5.73-10-.12-20ZM324.62-472.31q36.53 0 62.11-25.57 25.58-25.58 25.58-62.12t-25.58-62.12q-25.58-25.57-62.11-25.57-36.54 0-62.12 25.57-25.58 25.58-25.58 62.12t25.58 62.12q25.58 25.57 62.12 25.57Zm350.76 0q36.54 0 62.12-25.57 25.58-25.58 25.58-62.12t-25.58-62.12q-25.58-25.57-62.12-25.57-36.53 0-62.11 25.57-25.58 25.58-25.58 62.12t25.58 62.12q25.58 25.57 62.11 25.57Zm0-87.69Zm-350.76 0Z"/></svg>
  )
}

export const HorizontalRule = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M220-460q-8.5 0-14.25-5.76T200-480.03q0-8.51 5.75-14.24T220-500h520q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T740-460H220Z"/></svg>
  )
}

export const Paragraph = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M433.82-200q-8.51 0-14.24-5.75T413.85-220v-220h-7.7q-66.84 0-113.42-46.58-46.58-46.57-46.58-113.42t46.58-113.42Q339.31-760 406.15-760h236.93q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T643.08-720h-60v500q0 8.5-5.76 14.25T563.05-200q-8.51 0-14.24-5.75T543.08-220v-500h-89.23v500q0 8.5-5.76 14.25T433.82-200Z"/></svg>
  )
}

export const ClearMarks = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M501.85-561.38 464.23-599l31.54-76.15H391.15q-8.38-3-14.19-9.58-5.81-6.58-8.81-13.42-4.38-8.23.73-17.35 5.12-9.12 16.74-9.12H740q10.38 0 17.5 7.12 7.12 7.12 7.12 17.5 0 10.38-7.12 17.5-7.12 7.12-17.5 7.12H550.31l-48.46 114ZM759.38-144 454.62-449.54l-85.54 201.77q-3.16 7-9.04 11.23-5.89 4.23-13.89 4.23-13.53 0-20.77-11.23-7.23-11.23-1.92-23.54l93.77-219.84-280.92-280.16q-5.62-5.61-6-13.77-.39-8.15 6-14.53 6.38-6.39 14.15-6.39 7.77 0 14.16 6.39l623.07 623.07q5.62 5.62 6 13.77.39 8.16-6 14.54-6.38 6.39-14.15 6.39-7.77 0-14.16-6.39Z"/></svg>
  )
}

export const ClearNodes = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M709.77-643.77q24.85 19.39 24.85 51.08 0 31.69-24.85 51.07l-93.15 72.39q-6.62 4.38-13.93 3.77-7.31-.62-12.92-6.23-6.85-6.85-5.73-15.5 1.11-8.66 8.19-14.27l92.39-71.62q10-7.69 10-19.23t-10-19.23L495.38-758.77q-6.15-5.38-15-5.38-8.84 0-15.76 5.38L386.31-698q-6.62 4.38-13.93 3.77-7.3-.62-12.92-6.23-6.84-6.85-5.73-15.5 1.12-8.66 8.19-14.27l78.31-61q18.15-13.92 39.77-13.92 21.62 0 39.77 13.92l190 147.46Zm81.92 544.39L593.54-297.54l-73.77 56.93q-18.15 13.92-39.77 13.92-21.62 0-39.77-13.92L204.85-423.69q-7.54-5.85-7.81-15.35-.27-9.5 7.27-16.11 5.61-4.16 12.46-4.16 6.85 0 12.46 4.16l235.39 182.07q6.92 5.39 15.38 5.39t15.38-5.39L564-326.85l-69.23-68.77H523l-3.23 2.77q-18.15 13.16-39.77 13.27-21.62.12-39-13.8L247.92-543.15q-24.84-18.62-24.46-49.54.39-30.93 24.46-49.54l.46-.46L84-806.85q-5.85-5.84-6.35-13.88-.5-8.04 6.12-14.65Q90.38-842 98.04-842q7.65 0 14.27 6.62L820-127.69q5.62 5.61 6 13.77.38 8.15-6 14.54Q813.62-93 805.85-93q-7.77 0-14.16-6.38ZM473.15-587.54Zm282.77 132.39q7.31 6.61 6.93 15.61-.39 9-7.7 15.85l-52 40.77q-6.61 4.61-13.92 4-7.31-.62-12.92-6.23-6.85-6.85-5.85-15.73 1-8.89 8.31-14.5l52-39.77q5.61-4.16 12.58-4.16 6.96 0 12.57 4.16Z"/></svg>
  )
}

export const Notification = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill={color}><g clipPath="url(#clip0_4418_8691)"><path d="M20.19 14.0608L19.06 12.1808C18.81 11.7708 18.59 10.9808 18.59 10.5008V8.63078C18.59 5.00078 15.64 2.05078 12.02 2.05078C8.38996 2.06078 5.43996 5.00078 5.43996 8.63078V10.4908C5.43996 10.9708 5.21996 11.7608 4.97996 12.1708L3.84996 14.0508C3.41996 14.7808 3.31996 15.6108 3.58996 16.3308C3.85996 17.0608 4.46996 17.6408 5.26996 17.9008C6.34996 18.2608 7.43996 18.5208 8.54996 18.7108C8.65996 18.7308 8.76996 18.7408 8.87996 18.7608C9.01996 18.7808 9.16996 18.8008 9.31996 18.8208C9.57996 18.8608 9.83996 18.8908 10.11 18.9108C10.74 18.9708 11.38 19.0008 12.02 19.0008C12.65 19.0008 13.28 18.9708 13.9 18.9108C14.13 18.8908 14.36 18.8708 14.58 18.8408C14.76 18.8208 14.94 18.8008 15.12 18.7708C15.23 18.7608 15.34 18.7408 15.45 18.7208C16.57 18.5408 17.68 18.2608 18.76 17.9008C19.53 17.6408 20.12 17.0608 20.4 16.3208C20.68 15.5708 20.6 14.7508 20.19 14.0608ZM12.75 10.0008C12.75 10.4208 12.41 10.7608 11.99 10.7608C11.57 10.7608 11.23 10.4208 11.23 10.0008V6.90078C11.23 6.48078 11.57 6.14078 11.99 6.14078C12.41 6.14078 12.75 6.48078 12.75 6.90078V10.0008Z" fill="white" style={{fill:"var(--fillg)"}}/><path d="M14.8299 20.01C14.4099 21.17 13.2999 22 11.9999 22C11.2099 22 10.4299 21.68 9.87993 21.11C9.55993 20.81 9.31993 20.41 9.17993 20C9.30993 20.02 9.43993 20.03 9.57993 20.05C9.80993 20.08 10.0499 20.11 10.2899 20.13C10.8599 20.18 11.4399 20.21 12.0199 20.21C12.5899 20.21 13.1599 20.18 13.7199 20.13C13.9299 20.11 14.1399 20.1 14.3399 20.07C14.4999 20.05 14.6599 20.03 14.8299 20.01Z" fill="white" style={{fill:"var(--fillg)"}}/></g><defs><clipPath id="clip0_4418_8691"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
  )
}

export const Alert = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480v-160q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v160q0 17 11.5 28.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
  )
}

export const Unlink = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M616.92-456.31 563.23-510h36q12.77 0 21.38 8.62 8.62 8.61 8.62 21.38 0 7.69-3.23 13.77-3.23 6.08-9.08 9.92Zm210 365.39q-8.69 8.69-21.07 8.69-12.39 0-21.08-8.69L90.92-784.77q-8.3-8.31-8.5-20.88-.19-12.58 8.5-21.27 8.7-8.7 21.08-8.7 12.38 0 21.08 8.7l693.84 693.84q8.31 8.31 8.5 20.89.2 12.57-8.5 21.27ZM281.54-298.46q-75.31 0-128.42-53.12Q100-404.69 100-480q0-66.69 42.96-117.04 42.96-50.34 107.81-60.8H260l56.31 56.3h-34.77q-50.39 0-85.96 35.58Q160-530.38 160-480q0 50.38 35.58 85.96 35.57 35.58 85.96 35.58h121.54q12.77 0 21.38 8.61 8.62 8.62 8.62 21.39 0 12.77-8.62 21.38-8.61 8.62-21.38 8.62H281.54ZM360.77-450q-12.77 0-21.38-8.62-8.62-8.61-8.62-21.38t8.62-21.38Q348-510 360.77-510h47.69l59 60H360.77Zm372.69 114.31q-6.69-10.54-4.38-22.69 2.3-12.16 13.23-18.47 26.46-16.23 42.07-43.34Q800-447.31 800-480q0-50.38-35.38-85.96-35.39-35.58-85.39-35.58H556.92q-12.77 0-21.38-8.61-8.62-8.62-8.62-21.39 0-12.77 8.62-21.38 8.61-8.62 21.38-8.62h122.31q74.92 0 127.85 53.12Q860-555.31 860-480q0 47.46-23.08 87.65-23.08 40.2-62.31 65.12-10.53 6.69-22.5 4.38-11.96-2.3-18.65-12.84Z"/></svg>
  )
}

export const Plus = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><g clipPath="url(#clip0_4418_6162)"><path opacity="0.4" d="M6 12H18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18V6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_4418_6162"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
  )
}

export const Search = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path opacity="0.4" d="M22 22L20 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )
}

export const Account = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><g clipPath="url(#clip0_3111_32680)"><path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path opacity="0.4" d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26003 15 3.41003 18.13 3.41003 22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_3111_32680"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
  )
}

export const Settings = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><g clipPath="url(#clip0_4418_6270)"><path d="M3 9.10937V14.8794C3 16.9994 3 16.9994 5 18.3494L10.5 21.5294C11.33 22.0094 12.68 22.0094 13.5 21.5294L19 18.3494C21 16.9994 21 16.9994 21 14.8894V9.10937C21 6.99937 21 6.99937 19 5.64937L13.5 2.46937C12.68 1.98937 11.33 1.98937 10.5 2.46937L5 5.64937C3 6.99937 3 6.99937 3 9.10937Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path opacity="0.34" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_4418_6270"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
  )
}

export const Close = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
  )
}

export const ViewAll = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill={color}><g clipPath="url(#clip0_4418_4735)"><path d="M21 16.25H15C14.59 16.25 14.25 15.91 14.25 15.5C14.25 15.09 14.59 14.75 15 14.75H21C21.41 14.75 21.75 15.09 21.75 15.5C21.75 15.91 21.41 16.25 21 16.25Z" fill={color}/><path d="M21 20.25H15C14.59 20.25 14.25 19.91 14.25 19.5C14.25 19.09 14.59 18.75 15 18.75H21C21.41 18.75 21.75 19.09 21.75 19.5C21.75 19.91 21.41 20.25 21 20.25Z" fill={color}/><path opacity="0.4" d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z" fill={color}/><path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z" fill={color}/><path opacity="0.4" d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z" fill={color}/></g><defs><clipPath id="clip0_4418_4735"><rect width="24" height="24" fill={color}/></clipPath></defs></svg>
  )
}

export const Retry = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><path d="M14.55 21.67C18.84 20.54 22 16.64 22 12C22 6.48 17.56 2 12 2C5.33 2 2 7.56 2 7.56M2 7.56V3M2 7.56H4.01H6.44" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path opacity="0.4" d="M2 12C2 17.52 6.48 22 12 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" /></svg>
  )
}

export const Sort = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><g clipPath="url(#clip0_4418_6040)"><path opacity="0.4" d="M3.34985 2H12.2499C12.9899 2 13.5999 2.61001 13.5999 3.35001V4.82999C13.5999 5.36999 13.2599 6.04 12.9299 6.38L10.0299 8.94C9.62991 9.28 9.35986 9.94999 9.35986 10.49V13.39C9.35986 13.79 9.08988 14.33 8.74988 14.54L7.80987 15.15C6.92987 15.69 5.71985 15.08 5.71985 14V10.43C5.71985 9.95999 5.44987 9.35001 5.17987 9.01001L2.61987 6.31C2.27987 5.97 2.00989 5.36999 2.00989 4.95999V3.41C1.99989 2.61 2.60985 2 3.34985 2Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 12.0002V15.0002C2 20.0002 4 22.0002 9 22.0002H15C20 22.0002 22 20.0002 22 15.0002V9.00024C22 5.88024 21.22 3.92024 19.41 2.90024C18.9 2.61024 17.88 2.39023 16.95 2.24023" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path opacity="0.4" d="M13 13H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path opacity="0.4" d="M11 17H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></g><defs><clipPath id="clip0_4418_6040"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
  )
}

export const Filter = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><g clipPath="url(#clip0_4418_6202)"><path d="M5.3999 2.09961H18.5999C19.6999 2.09961 20.5999 2.99961 20.5999 4.09961V6.29961C20.5999 7.09961 20.0999 8.09961 19.5999 8.59961L15.2999 12.3996C14.6999 12.8996 14.2999 13.8996 14.2999 14.6996V18.9996C14.2999 19.5996 13.8999 20.3996 13.3999 20.6996L11.9999 21.5996C10.6999 22.3996 8.8999 21.4996 8.8999 19.8996V14.5996C8.8999 13.8996 8.4999 12.9996 8.0999 12.4996L4.2999 8.49961C3.7999 7.99961 3.3999 7.09961 3.3999 6.49961V4.19961C3.3999 2.99961 4.2999 2.09961 5.3999 2.09961Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /><path opacity="0.4" d="M10.93 2.09961L6 9.99961" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></g><defs><clipPath id="clip0_4418_6202"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
  )
}

export const ArrowTopRight = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><g opacity="0.4"><path d="M13 10.9998L21.2 2.7998" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M21.9992 6.8V2H17.1992" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></g><path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )
}

export const ThreeDots = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><g clipPath="url(#clip0_4418_6271)"><path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z" stroke={color} strokeWidth="1.75" /><path d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z" stroke={color} strokeWidth="1.75" /><path opacity="0.4" d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" stroke={color} strokeWidth="1.75" /></g><defs><clipPath id="clip0_4418_6271"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>)
}

export const LogOut = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><path d="M8.90002 7.56023C9.21002 3.96023 11.06 2.49023 15.11 2.49023H15.24C19.71 2.49023 21.5 4.28023 21.5 8.75023V15.2702C21.5 19.7402 19.71 21.5302 15.24 21.5302H15.11C11.09 21.5302 9.24002 20.0802 8.91002 16.5402" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><g opacity="0.4"><path d="M14.9991 12H3.61914" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M5.85 8.65039L2.5 12.0004L5.85 15.3504" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></g></svg>
)}

export const Editor = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill={color}><g clipPath="url(#clip0_4418_7252)"><path d="M16 22.75H8C4.35 22.75 2.25 20.65 2.25 17V7C2.25 3.35 4.35 1.25 8 1.25H16C19.65 1.25 21.75 3.35 21.75 7V17C21.75 20.65 19.65 22.75 16 22.75ZM8 2.75C5.14 2.75 3.75 4.14 3.75 7V17C3.75 19.86 5.14 21.25 8 21.25H16C18.86 21.25 20.25 19.86 20.25 17V7C20.25 4.14 18.86 2.75 16 2.75H8Z" fill={color} style={{fill:"var(--fillg)"}}/><path d="M18.5 9.25H16.5C14.98 9.25 13.75 8.02 13.75 6.5V4.5C13.75 4.09 14.09 3.75 14.5 3.75C14.91 3.75 15.25 4.09 15.25 4.5V6.5C15.25 7.19 15.81 7.75 16.5 7.75H18.5C18.91 7.75 19.25 8.09 19.25 8.5C19.25 8.91 18.91 9.25 18.5 9.25Z" fill={color} style={{fill:"var(--fillg)"}}/><path d="M12 13.75H8C7.59 13.75 7.25 13.41 7.25 13C7.25 12.59 7.59 12.25 8 12.25H12C12.41 12.25 12.75 12.59 12.75 13C12.75 13.41 12.41 13.75 12 13.75Z" fill={color} style={{fill:"var(--fillg)"}}/><path d="M16 17.75H8C7.59 17.75 7.25 17.41 7.25 17C7.25 16.59 7.59 16.25 8 16.25H16C16.41 16.25 16.75 16.59 16.75 17C16.75 17.41 16.41 17.75 16 17.75Z" fill={color} style={{fill:"var(--fillg)"}}/></g><defs><clipPath id="clip0_4418_7252"><rect width="24" height="24" fill={color}/></clipPath></defs></svg>
)}

export const Data = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><g clipPath="url(#clip0_4418_169606)"><path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path opacity="0.4" d="M15.75 9H8.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path opacity="0.4" d="M15.75 15H8.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></g><defs><clipPath id="clip0_4418_169606"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
)}

export const Export = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><g opacity="0.4"><path d="M9.32031 6.50043L11.8803 3.94043L14.4403 6.50043" stroke={color} strokeWidth="1.8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /><path d="M11.8809 14.1798V4.00977" stroke={color} strokeWidth="1.8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></g><path d="M4 12C4 16.42 7 20 12 20C17 20 20 16.42 20 12" stroke={color} strokeWidth="1.8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
)}

export const AccountEdit = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><g clipPath="url(#clip0_3111_32686)"><path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M19.2101 15.74L15.67 19.2801C15.53 19.4201 15.4 19.68 15.37 19.87L15.18 21.22C15.11 21.71 15.45 22.05 15.94 21.98L17.29 21.79C17.48 21.76 17.75 21.63 17.88 21.49L21.42 17.95C22.03 17.34 22.32 16.63 21.42 15.73C20.53 14.84 19.8201 15.13 19.2101 15.74Z" stroke={color} strokeWidth="1.8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /><path d="M18.7002 16.25C19.0002 17.33 19.8402 18.17 20.9202 18.47" stroke={color} strokeWidth="1.8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /><path opacity="0.4" d="M3.40991 22C3.40991 18.13 7.25994 15 11.9999 15C13.0399 15 14.0399 15.15 14.9699 15.43" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></g><defs><clipPath id="clip0_3111_32686"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
)}

export const ScrollDown = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 24 24" fill="none"><path d="M16.01 12.8502L13.39 15.4702C12.62 16.2402 11.36 16.2402 10.59 15.4702L4.08002 8.9502" stroke={color} strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /><path d="M19.92 8.9502L18.88 9.9902" stroke={color} strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
)}

export const Save = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg width={dimension} height={dimension} viewBox="0 0 24 24" fill={color}><g clipPath="url(#clip0)"><path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill={color}/><path d="M18 15.25a.75.75 0 0 1-.75-.75c0-.69-.56-1.25-1.25-1.25H8c-.69 0-1.25.56-1.25 1.25a.75.75 0 0 1-1.5 0V7.75C5.25 6.23 6.48 5 8 5h8c1.52 0 2.75 1.23 2.75 2.75V14.5a.75.75 0 0 1-.75.75ZM8 11.75h8c.45 0 .88.11 1.25.3V7.75c0-.69-.56-1.25-1.25-1.25H8c-.69 0-1.25.56-1.25 1.25v4.3c.37-.19.8-.3 1.25-.3Z" fill={color}/><path d="M19 16.5h-1a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 0 1.5ZM6 16.5H5a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 0 1.5Z" fill={color}/><path d="M18 14.75a.75.75 0 0 1-.75-.75v-3c0-.69-.56-1.25-1.25-1.25H8c-.69 0-1.25.56-1.25 1.25v3a.75.75 0 0 1-1.5 0v-3C5.25 9.48 6.48 8.25 8 8.25h8c1.52 0 2.75 1.23 2.75 2.75v3a.75.75 0 0 1-.75.75Z" fill={color}/><path d="M12 19c-1.53 0-2.82-1.07-3.16-2.5H6a.75.75 0 0 1-.75-.75V14.5c0-1.52 1.23-2.75 2.75-2.75h8c1.52 0 2.75 1.23 2.75 2.75v1.25a.75.75 0 0 1-.75.75h-2.84C14.82 17.93 13.53 19 12 19Zm-5.25-4h2.75a.75.75 0 0 1 .75.75c0 .96.79 1.75 1.75 1.75s1.75-.79 1.75-1.75a.75.75 0 0 1 .75-.75h2.75v-.5c0-.69-.56-1.25-1.25-1.25H8c-.69 0-1.25.56-1.25 1.25v.5Z" fill={color}/></g><defs><clipPath id="clip0"><rect width="24" height="24"/></clipPath></defs></svg>
)}

export const H1 = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M259.97-300q-8.51 0-14.24-5.75T240-320v-320q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75T280-640v140h200v-140q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75T520-640v320q0 8.5-5.76 14.25T499.97-300q-8.51 0-14.24-5.75T480-320v-140H280v140q0 8.5-5.76 14.25T259.97-300Zm440 0q-8.51 0-14.24-5.75T680-320v-300h-60q-8.5 0-14.25-5.76T600-640.03q0-8.51 5.75-14.24T620-660h67.31q14.31 0 23.5 9.29t9.19 23.02V-320q0 8.5-5.76 14.25T699.97-300Z"/></svg>
)}

export const H2 = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M179.97-300q-8.51 0-14.24-5.75T160-320v-320q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75T200-640v140h200v-140q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75T440-640v320q0 8.5-5.76 14.25T419.97-300q-8.51 0-14.24-5.75T400-320v-140H200v140q0 8.5-5.76 14.25T179.97-300Zm372.34 0q-13.73 0-23.02-9.29T520-332.31v-103.07q0-26.66 18.98-45.64T584.62-500h150.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-70.76q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H540q-8.5 0-14.25-5.76T520-640.03q0-8.51 5.75-14.24T540-660h195.38q26.66 0 45.64 18.98T800-595.38v70.76q0 26.66-18.98 45.64T735.38-460H584.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7V-340h220q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-300H552.31Z"/></svg>
)}

export const H3 = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M179.97-300q-8.51 0-14.24-5.75T160-320v-320q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75T200-640v140h200v-140q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75T440-640v320q0 8.5-5.76 14.25T419.97-300q-8.51 0-14.24-5.75T400-320v-140H200v140q0 8.5-5.76 14.25T179.97-300ZM540-300q-8.5 0-14.25-5.76T520-320.03q0-8.51 5.75-14.24T540-340h195.38q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7V-460H620q-8.5 0-14.25-5.76T600-480.03q0-8.51 5.75-14.24T620-500h140v-95.38q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H540q-8.5 0-14.25-5.76T520-640.03q0-8.51 5.75-14.24T540-660h195.38q26.66 0 45.64 18.98T800-595.38v230.76q0 26.66-18.98 45.64T735.38-300H540Z"/></svg>
)}

export const H4 = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M164.59-300q-8.51 0-14.24-5.75T144.62-320v-320q0-8.5 5.75-14.25 5.76-5.75 14.27-5.75t14.24 5.75q5.74 5.75 5.74 14.25v140h200v-140q0-8.5 5.75-14.25 5.76-5.75 14.27-5.75t14.24 5.75q5.74 5.75 5.74 14.25v320q0 8.5-5.76 14.25T404.59-300q-8.51 0-14.24-5.75T384.62-320v-140h-200v140q0 8.5-5.76 14.25T164.59-300Zm560 0q-8.51 0-14.24-5.75T704.62-320v-100h-167.7q-13.73 0-23.02-9.29-9.28-9.29-9.28-23.02V-640q0-8.5 5.75-14.25 5.76-5.75 14.27-5.75t14.24 5.75q5.74 5.75 5.74 14.25v180h160v-180q0-8.5 5.75-14.25 5.76-5.75 14.27-5.75t14.24 5.75q5.74 5.75 5.74 14.25v180h60q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T804.62-420h-60v100q0 8.5-5.76 14.25T724.59-300Z"/></svg>
)}

export const H5 = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M179.97-300q-8.51 0-14.24-5.75T160-320v-320q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75T200-640v140h200v-140q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75T440-640v320q0 8.5-5.76 14.25T419.97-300q-8.51 0-14.24-5.75T400-320v-140H200v140q0 8.5-5.76 14.25T179.97-300ZM540-300q-8.5 0-14.25-5.76T520-320.03q0-8.51 5.75-14.24T540-340h195.38q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-70.76q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H552.31q-13.73 0-23.02-9.19t-9.29-23.5v-134.62q0-14.31 9.29-23.5t23.02-9.19H780q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-620H560v120h175.38q26.66 0 45.64 18.98T800-435.38v70.76q0 26.66-18.98 45.64T735.38-300H540Z"/></svg>
)}

export const H6 = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M179.97-300q-8.51 0-14.24-5.75T160-320v-320q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75T200-640v140h200v-140q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75T440-640v320q0 8.5-5.76 14.25T419.97-300q-8.51 0-14.24-5.75T400-320v-140H200v140q0 8.5-5.76 14.25T179.97-300Zm404.65 0q-26.66 0-45.64-18.98T520-364.62v-230.76q0-26.66 18.98-45.64T584.62-660H780q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-620H584.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7V-500h175.38q26.66 0 45.64 18.98T800-435.38v70.76q0 26.66-18.98 45.64T735.38-300H584.62ZM560-460v95.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h150.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-70.76q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H560Z"/></svg>
)}

export const OrderedList = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M682.31-120q-7.67 0-12.68-5-5.01-5.01-5.01-12.66t5.01-12.69q5.01-5.03 12.68-5.03h82.31V-210h-42.31q-7.67 0-12.68-5-5.01-5.01-5.01-12.66t5.01-12.69q5.01-5.03 12.68-5.03h42.31V-300h-82.31q-7.67 0-12.68-5-5.01-5.01-5.01-12.66t5.01-12.69q5.01-5.03 12.68-5.03h90q11.77 0 19.73 7.96 7.96 7.96 7.96 19.73v55.38q0 11.77-7.96 19.73-7.96 7.96-19.73 7.96 11.77 0 19.73 7.97 7.96 7.96 7.96 19.73v49.23q0 11.77-7.96 19.73-7.96 7.96-19.73 7.96h-90Zm6.92-252.31q-9.92 0-17.27-7.34-7.34-7.35-7.34-17.27V-470q0-11.77 7.96-19.73 7.96-7.96 19.73-7.96h72.31v-54.62h-82.31q-7.67 0-12.68-5t-5.01-12.65q0-7.66 5.01-12.69 5.01-5.04 12.68-5.04h90q11.77 0 19.73 7.96Q800-571.77 800-560v70q0 11.77-7.96 19.73-7.96 7.96-19.73 7.96H700v54.62h82.31q7.66 0 12.68 5 5.01 5 5.01 12.65 0 7.66-5.01 12.69-5.02 5.04-12.68 5.04h-93.08Zm53.11-252.31q-7.65 0-12.69-5.01-5.03-5.01-5.03-12.68v-162.31h-42.31q-7.67 0-12.68-5t-5.01-12.65q0-7.65 5.01-12.69 5.01-5.04 12.68-5.04h53.84q9.93 0 16.89 6.96 6.96 6.96 6.96 16.89v173.84q0 7.67-5 12.68-5.01 5.01-12.66 5.01ZM180-220q-8.5 0-14.25-5.76T160-240.03q0-8.51 5.75-14.24T180-260h375.38q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T555.38-220H180Zm0-240q-8.5 0-14.25-5.76T160-480.03q0-8.51 5.75-14.24T180-500h375.38q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T555.38-460H180Zm0-240q-8.5 0-14.25-5.76T160-720.03q0-8.51 5.75-14.24T180-740h375.38q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T555.38-700H180Z"/></svg>
)}



export const UnorderedList = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M404.62-220q-8.5 0-14.25-5.76t-5.75-14.27q0-8.51 5.75-14.24t14.25-5.73H780q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-220H404.62Zm0-240q-8.5 0-14.25-5.76t-5.75-14.27q0-8.51 5.75-14.24t14.25-5.73H780q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-460H404.62Zm0-240q-8.5 0-14.25-5.76t-5.75-14.27q0-8.51 5.75-14.24t14.25-5.73H780q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T780-700H404.62ZM213.08-186.92q-21.9 0-37.49-15.59Q160-218.11 160-240t15.59-37.49q15.59-15.59 37.49-15.59 21.89 0 37.48 15.59 15.59 15.6 15.59 37.49t-15.59 37.49q-15.59 15.59-37.48 15.59Zm0-240q-21.9 0-37.49-15.59Q160-458.11 160-480t15.59-37.49q15.59-15.59 37.49-15.59 21.89 0 37.48 15.59 15.59 15.6 15.59 37.49t-15.59 37.49q-15.59 15.59-37.48 15.59Zm0-240q-21.9 0-37.49-15.59Q160-698.11 160-720t15.59-37.49q15.59-15.59 37.49-15.59 21.89 0 37.48 15.59 15.59 15.6 15.59 37.49t-15.59 37.49q-15.59 15.59-37.48 15.59Z"/></svg>
  )
}

export const TaskList = ({dimension = 24, color='#000000'}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={dimension} viewBox="0 -960 960 960" width={dimension} fill={color}><path d="M624.62-160q-16.08 0-28.04-11.96T584.62-200v-175.38q0-16.08 11.96-28.04t28.04-11.96H800q16.08 0 28.04 11.96T840-375.38V-200q0 16.08-11.96 28.04T800-160H624.62Zm0-40H800v-175.38H624.62V-200ZM140-267.69q-8.5 0-14.25-5.76T120-287.72q0-8.51 5.75-14.24t14.25-5.73h289.23q8.5 0 14.25 5.76 5.75 5.75 5.75 14.26 0 8.52-5.75 14.25t-14.25 5.73H140Zm484.62-276.93q-16.08 0-28.04-11.96t-11.96-28.04V-760q0-16.08 11.96-28.04T624.62-800H800q16.08 0 28.04 11.96T840-760v175.38q0 16.08-11.96 28.04T800-544.62H624.62Zm0-40H800V-760H624.62v175.38ZM140-652.31q-8.5 0-14.25-5.76-5.75-5.75-5.75-14.26 0-8.52 5.75-14.25t14.25-5.73h289.23q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24t-14.25 5.73H140Zm572.31 364.62Zm0-384.62Z"/></svg>
  )
}