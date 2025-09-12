import { Vector3 } from '@dcl/sdk/math'
import { engine, GltfContainer, GltfNodeModifiers, Material, Transform, VideoPlayer } from '@dcl/sdk/ecs'

export function main() {

     const loveSeat = engine.addEntity()
    Transform.create(loveSeat, { position: Vector3.create(8, .5, 8) })

    // Add the neon model
    GltfContainer.create(loveSeat, {
        src: 'models/loveSeat.glb',
    })

    // Add VideoPlayer to the neon entity
    VideoPlayer.create(loveSeat, {
    src: 'https://player.vimeo.com/progressive_redirect/playback/1114393102/rendition/240p/file.mp4?loc=external&log_user=0&signature=f9d11322367f1ddd8f2218b3b4c83b8a269826d7e32ed8b2c2d767e988681157',
        playing: true,
        loop: true,
    })

    // Apply video texture to the neon model using GltfNodeModifiers
    GltfNodeModifiers.create(loveSeat, {
        modifiers: [{
            path: '',
            material: {
                material: {
                    $case: 'pbr', pbr: {
                        texture: Material.Texture.Video({
                            videoPlayerEntity: loveSeat,
                        }),
                        alphaTest: 0.5,
                        transparencyMode: 1, // ALPHA_BLEND

                    },
                },
            },
        }]
    })


}
