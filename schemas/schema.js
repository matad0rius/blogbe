// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import React from 'react';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';
// import InstagramEmbed from "react-instagram-embed";

const Preview = ({value}) => {
	const { url } = value
	const id = getYouTubeId(url)
	return (<YouTube videoId={id} />)
}

// const InstagramPreview = ({ value }) => {
//   const { url } = value;
//   return (
//     <InstagramEmbed
//       url={url}
//       maxWidth={480}
//       containerTagName="div"
//       injectScript
//     />
//   );
// };

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: 'author',
      type: 'document',
      title: 'Author',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          name: 'avatar',
          title: 'Avatar',
          type: 'image'
        }
      ]
    },
    {
      name: 'blog',
      type: 'document',
      title: 'Blog',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title'
        },
        {
          name: 'subtitle',
          type: 'string',
          title: 'Subtitle'
        },
        {
          name: 'coverImage',
          title: 'Cover Image',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Description'
            }
          ]
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [
            {
              type: 'block'
            },
            // {
            //   type: 'object',
            //   name: 'instagramPost',
            //   title: 'Instagram Post',
            //   fields: [
            //     {
            //       name: 'url',
            //       type: 'url',
            //       description: 'Visit an Instagram post'
            //     }
            //   ],
            //   preview: {
            //     selet: {
            //       url: 'url'
            //     },
            //     component: InstagramPreview
            //   }
            // },
            {
              name: 'youtube',
              type: 'object',
              title: 'Youtube',
              fields: [
                {
                  name: 'url',
                  type: 'url',
                  title: 'Youtube video URL'
                }
              ],
              preview: {
                select: {
                  url: 'url'
                },
                component: Preview
              }
            },
            {
              type: 'image',
              fields: [
                {
                  title: 'Image Position',
                  name: 'position',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'center', value: 'center'},
                      {title: 'left', value: 'left'},
                      {title: 'right', value: 'right'},
                    ],
                    layout: 'radio',
                    isHighlighted: true
                  },
                },
                {
                  type: 'text',
                  name: 'alt',
                  title: 'Description',
                  options: {
                    isHighlighted: true
                  }
                }
              ],
                options: {
                  hotspot: true
              },
            },
            {
              type: 'code',
              options: {
                withFilename: true
              }
            }
          ]
        },
        {
          name: 'date',
          title: 'Date',
          type: 'datetime',
          validation: Rule => Rule.required()
        },
        {
          name: 'author',
          title: 'Author',
          type: 'reference',
          to: [
            {
              type: 'author'
            },
          ],
          validation: Rule => Rule.required()
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          validation: Rule => Rule.required()
        }
      ]
    }
  ])
})