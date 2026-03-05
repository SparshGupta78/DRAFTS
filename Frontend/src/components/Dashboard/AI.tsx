import type { ReactNode } from 'react'
import { Info } from '../../assets/Icons'
import DialogWrapper from '../DialogWrapper/DialogWrapper'
import { AI as AiIcon } from "../../assets/Icons"

type props = {
  aiOpen: boolean,
  setAiOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type btnProps = {
  type: string,
  content: ReactNode,
  onClick: () => void
}

const Button = ({ btn }: {btn: btnProps}) => {
  return (
    <button
      type="button"
      className='border-3 border-[var(--black-6)] px-2.5 py-1.5 rounded-lg bg-[var(--black-4)] text-[13px] text-[var(--black-2)] font-normal whitespace-nowrap duration-300 hover:scale-96 active:scale-92'
      onClick={btn.onClick}
    >
      {btn.content}
    </button>
  )
}

const AI = ({
  aiOpen,
  setAiOpen
}: props) => {

  const generalBtns: btnProps[] = [
    {
      type: "button",
      content: "Generate Heading",
      onClick: () => {}
    },
    {
      type: "button",
      content: "Extract Tags",
      onClick: () => {}
    }
  ]

  const noteBtns: btnProps[] = [
    {
      type: "button",
      content: "Summarize",
      onClick: () => {}
    },
    {
      type: "button",
      content: "Expand",
      onClick: () => {}
    },
    {
      type: "button",
      content: "Rephrase",
      onClick: () => {}
    },
    {
      type: "button",
      content: "Grammar & Spell Check",
      onClick: () => {}
    }
  ]

  return (
    <DialogWrapper
      open={aiOpen}
      setOpen={setAiOpen}
      header={"AI Features"}
    >
      <div className="h-full w-full overflow-y-scroll">
        <div className="p-2.5 w-full h-fit flex flex-col gap-2.5">
          <div className="p-2.5 border-1 border-[var(--black-4)] rounded-lg">
            <div className="px-2.5 pb-2.5 w-full flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <span className='rotate-180'>
                  <Info
                    dimension={16}
                    color='#4C4C4C'
                  />
                </span>
                <span className='text-sm'>
                  You can select any specific portion of your note to apply AI only to that section.
                </span>
              </div>
              <div className='w-full sm:w-fit flex justify-end'>
                <button
                  type="button"
                  className='w-fit text-sm text-[var(--blue-2)] font-normal duration-300 hover:opacity-75 active:opacity-60'
                >
                  Select All
                </button>
              </div>
            </div>
            <div className="p-2.5 bg-[var(--black-6)] rounded-md min-h-10 max-h-50 overflow-y-scroll">
              <div className="w-full rounded-md text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quam eum necessitatibus quidem, placeat corporis, quos, illum aspernatur saepe minus quas laudantium! Quo fugiat iure dolore qui magnam repellendus esse.
                Minus mollitia expedita iste consequuntur non quis inventore illo deleniti delectus earum? Eos aperiam, porro quasi adipisci accusantium repudiandae tempora itaque laboriosam? Quas qui esse consequuntur libero in aliquam quam?
                Quibusdam doloremque sed vel deserunt. Adipisci repellat libero tenetur fugit, quo saepe accusantium. Error deleniti laborum, dicta fugit praesentium iste facilis aliquid laboriosam illum ratione porro saepe quasi id explicabo.
                Voluptate explicabo dolor molestiae molestias officia nesciunt cumque quis, soluta accusantium reprehenderit magnam perspiciatis, cum sed dicta vero! Optio blanditiis laudantium commodi, molestias autem repudiandae iure pariatur inventore at delectus.
                Rerum qui cum recusandae repellendus, ipsum amet quo laborum? Laborum quisquam quis, fugiat quia mollitia, qui ut suscipit eos eaque, accusamus ipsam saepe voluptatem nisi maxime officia nostrum alias iure.
                Optio, amet dicta nobis possimus, saepe ipsam recusandae laudantium minus earum expedita, dolorem mollitia voluptate eaque molestiae sapiente similique. Minus veniam blanditiis similique laborum amet nesciunt alias quia quam. Sapiente.
                Iste voluptate consequatur et animi repellendus architecto corrupti, voluptatibus sint deserunt maxime commodi doloremque exercitationem eius, dolores velit harum odit temporibus ipsum itaque suscipit rem iure aspernatur vitae quae. Facilis.
                Expedita dolore veritatis minus, architecto culpa vitae accusamus deserunt, sapiente natus aspernatur cum quis sed eligendi placeat facilis non explicabo recusandae aliquam, officia pariatur exercitationem ullam unde cumque sit. Est?
                Amet voluptates nulla repellat dolore officia ad, beatae quisquam deleniti odit quam modi doloremque nostrum cum reiciendis molestias iure. Error fugit repellendus veritatis praesentium ullam fugiat fuga quibusdam ab delectus.
                Amet sint dolore accusantium ex inventore illo repudiandae modi at necessitatibus! Magni aspernatur, consequuntur praesentium harum asperiores quas non esse eos, consequatur quaerat quisquam? Veniam consequuntur sed consequatur eveniet vel.
                Quas, qui? Eaque deserunt in ipsa optio deleniti sint laborum id, reprehenderit sunt beatae harum voluptas obcaecati natus sed quaerat laudantium, ducimus maxime. Quibusdam nulla ea libero repellat nihil eius!
                Veritatis earum optio nobis, sunt reprehenderit sint deleniti nostrum vero doloribus quasi itaque modi minima. Optio quibusdam adipisci laudantium cupiditate laboriosam tempore a unde labore, praesentium, fugit, sint ad rerum!
                Reiciendis inventore molestiae, repudiandae aut eveniet fugiat. Praesentium possimus soluta veniam omnis aliquam unde rem est quae nostrum ducimus, nisi recusandae aspernatur quaerat consequatur nihil beatae similique labore nam sit!
                Aspernatur libero, ex quia perferendis explicabo obcaecati numquam quam molestiae laboriosam sunt. Numquam esse eos sed perferendis placeat ullam soluta enim reprehenderit a sequi. Aliquam quo animi iusto totam quos.
                Sint natus iste consequatur? Harum magnam unde velit nam a, blanditiis veritatis ipsa incidunt veniam fuga, ea in natus pariatur earum debitis voluptatem vero doloribus provident reprehenderit! Eaque, perferendis cum?
                Illum, tempora? Quae suscipit dignissimos quasi officia hic placeat ipsa totam natus magnam. Rem explicabo libero, tenetur itaque et nisi! Cupiditate dicta neque ab aut nesciunt alias dolorem maxime est.
                Dicta officiis nihil aliquam facilis vitae natus deleniti eaque perferendis odit dolores nulla, voluptate ut eligendi, sequi, dolor numquam explicabo est? Voluptates modi inventore quod mollitia, laboriosam labore alias. Sint?
                Sit fugit optio ipsa, qui reprehenderit odio harum delectus laborum, obcaecati cumque corporis! Molestiae voluptates ad, consectetur aperiam eaque quas animi vel veritatis quo dignissimos. Rerum minima architecto quia ea!
                Autem quae delectus iste doloremque odio, dicta nihil accusamus nisi porro in enim dolore provident error possimus recusandae! Illum doloremque aut placeat ipsam nihil obcaecati optio laborum voluptatem deleniti veritatis.
                Tenetur quasi quos, dicta distinctio debitis facilis perspiciatis, natus ducimus sint ipsum dolor voluptas ratione hic, deserunt iusto assumenda? Veniam magni eius odio maxime fugit quod at commodi, qui aut?
              </div>
            </div>
          </div>
          <div className="p-2.5 w-full border border-[var(--black-4)] rounded-lg">
            <div className="text-xs text-[var(--black-2)] mb-1.5">
              AI Output
            </div>
            <div className="relative">
              <div className="absolute left-0 top-0 w-full h-3 bg-gradient-to-b from-[var(--white-1)] to-transparent"></div>
              <div className="w-full min-h-10 max-h-40 overflow-y-scroll py-1.5">
                <div className="w-full h-fit text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, possimus amet iste eum reiciendis, excepturi temporibus ab nostrum qui soluta, optio mollitia odit numquam laboriosam nulla nesciunt quibusdam a quisquam!
                  Nulla obcaecati, eligendi eius ullam unde numquam esse dolorum dolor, ut dolore, autem iste voluptatum? Odit consectetur cum illo, id sed enim deleniti nulla iste, et rerum eaque, omnis atque!
                  Consectetur debitis deserunt porro velit veritatis deleniti exercitationem necessitatibus temporibus, vitae officiis animi quas doloribus sapiente iure, quam numquam quo nulla rem obcaecati corporis quia ipsam? Ipsam quibusdam illum amet.
                  Ut veritatis rem assumenda maxime nisi enim. Earum sit optio inventore veniam voluptas. Cum nemo, cumque, deserunt beatae et incidunt modi ad molestiae quis iste tempora eveniet quaerat vel consequatur?
                  Architecto dolores eligendi adipisci quaerat dolorum ipsum tenetur ad necessitatibus nostrum, iure omnis labore, impedit facere officia quidem molestiae ut placeat voluptates debitis ex, blanditiis voluptatibus animi! Possimus, molestias pariatur.
                  Fuga rem ipsa quam nesciunt quas autem pariatur quia voluptatum deleniti itaque hic, incidunt similique soluta nobis, cum dolor, sequi minus numquam accusantium dolores esse? Ut placeat porro tenetur veniam.
                  Repellat magni ea vero architecto, aperiam sint quae doloribus culpa amet! Nisi exercitationem nihil libero accusamus harum blanditiis veritatis, quos at. At eos explicabo ab non facilis repellat illo. Omnis!
                  Alias eum illo incidunt deserunt deleniti esse natus harum aut voluptatem, pariatur, sunt porro iste repudiandae quo, totam repellat asperiores perspiciatis laudantium vitae officiis recusandae consequatur. Autem ipsam officia assumenda.
                  Fugiat voluptatem at accusantium, eligendi iste velit quaerat quae delectus commodi, fuga perspiciatis? Iure dolores ipsam obcaecati sint quibusdam, odit dolor. Explicabo, placeat iusto. Corporis natus ut excepturi velit reprehenderit?
                  Ipsa cumque repudiandae, quis maxime deleniti illum, veritatis aliquam cupiditate possimus placeat exercitationem, nam iste incidunt deserunt et laboriosam dolore quisquam quibusdam quaerat velit corporis tempore suscipit? Nobis, optio deserunt.
                </div>
              </div>
              <div className="absolute left-0 bottom-0 w-full h-3 bg-gradient-to-b from-transparent to-[var(--white-1)]"></div>
            </div>
          </div>
          <div className="p-2.5 w-full flex flex-col gap-2.5">
            <div className="w-full flex flex-wrap gap-1.5">
              {generalBtns.map((btn, i) => {
                if(btn.type == "button") {
                  return <Button key={i} btn={btn} />
                }
              })}
            </div>
            <hr className='border-[var(--black-6)]' />
            <div className="w-full flex flex-wrap gap-1.5">
              {noteBtns.map((btn, i) => {
                if(btn.type == "button") {
                  return <Button key={i} btn={btn} />
                }
              })}
            </div>
          </div>
          <div className="p-2.5 w-full flex flex-col md:flex-row items-center gap-2.5">
            <div className="flex items-center gap-2.5">
              <span>
                <Info dimension={18} color='#4C4C4C' />
              </span>
              <span className='text-sm text-[var(--black-2)]'>
                By accepting these AI-generated changes, the selected content will be permanently replaced. The previous version cannot be recovered.
              </span>
            </div>
            <div className="w-full md:w-fit flex justify-end">
              <button
                type="button"
                className='px-3 py-1.5 bg-[var(--blue-2)] rounded-lg flex items-center gap-1.5'
              >
                <span>
                  <AiIcon dimension={20} color='#fff' />
                </span>
                <div className="text-[var(--white-1)] font-normal">Create</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DialogWrapper>
  )
}

export default AI