'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Env = use('Env')
const { Expo } = require('expo-server-sdk')
const Model = use('Model')

class UserDevice extends Model {
  static getDevicesByViagem (alunosIds) {
    return this.query()
      .from('user_devices')
      .innerJoin('users', 'users.id', 'user_devices.id_aluno')
      .where('users.id', 'in', alunosIds)
      .fetch()
  }

  static async notifyAlunos (viagem) {
    try {
      const { alunos } = viagem
      const alunosIds = alunos.map(({ id }) => id)

      const devicesWithUser = (await UserDevice.getDevicesByViagem(alunosIds)).toJSON()

      try {
        const tokensToSend = (
          devicesWithUser
            .filter((device) => device.device_token)
            .map((device) => device.device_token)
        )

        const text = 'Confirme sua vaga na viagem de hoje!'

        const expo = new Expo({ accessToken: Env.getOrFail('EXPO_PUSH_NOTIFICATION_API_KEY') })

        const messages = []
        for (const pushToken of tokensToSend) {
          if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`)
            continue
          }

          messages.push({
            to: pushToken,
            sound: 'default',
            body: text
          })
        }

        const chunks = expo.chunkPushNotifications(messages)
        const tickets = [];
        (async () => {
          for (const chunk of chunks) {
            try {
              const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
              tickets.push(...ticketChunk)
            } catch (error) {
              console.error(error)
            }
          }
        })()

        const receiptIds = []
        for (const ticket of tickets) {
          if (ticket.id) {
            receiptIds.push(ticket.id)
          }
        }

        const receiptIdChunks = await expo.chunkPushNotificationReceiptIds(receiptIds);

        (async () => {
          for (const chunk of receiptIdChunks) {
            try {
              const receipts = await expo.getPushNotificationReceiptsAsync(chunk)

              for (const receiptId in receipts) {
                const { status, message, details } = receipts[receiptId]
                console.log('status', status)
                if (status === 'ok') {
                  continue
                } else if (status === 'error') {
                  console.error(
                    `There was an error sending a notification: ${message}`
                  )
                  if (details && details.error) {
                    console.error(`The error code is ${details.error}`)
                  }
                }
              }
            } catch (error) {
              console.error(error)
            }
          }
        })()

        const badTokens = (
          devicesWithUser
            .filter((data) => !data.device_token)
            .map((data) => data.device_token)
        )

        await this.cleanUnusedTokens(badTokens)
      } catch (e) {
        console.log('error')
        console.log(e)
      }
    } catch (e) {
      console.log('asdasd')
      console.log(e)
    }
  }

  static async cleanUnusedTokens (badTokens) {
    await this.query().whereIn('device_token', badTokens).delete()
  }
}

module.exports = UserDevice
